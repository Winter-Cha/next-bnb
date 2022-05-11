import App, { AppInitialProps } from "next/app";
import axios from "../lib/api";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { cookieStringToObject } from "../lib/util";
import { wrapper } from "../store";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps((store) => {
    return async (context) => {
      const appInitialProps = await App.getInitialProps(context);
      const cookieObject = cookieStringToObject(
        context.ctx.req?.headers.cookie
      );
      const { isLogged } = store.getState().user;
      try {
        if (!isLogged && cookieObject.access_token) {
          axios.defaults.headers.common["cookie"] = cookieObject.access_token;
          const { data } = await meAPI();
          //console.log(data);
          store.dispatch(userActions.setLoggedUser(data));
        }
      } catch (e) {
        console.log(e);
      }
      return { ...appInitialProps };
    };
  });

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Header />
        <GlobalStyle />
        <Component {...pageProps} />
        <div id="root-modal" />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
