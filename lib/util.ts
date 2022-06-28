//* "token=value"를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieString) {
        //* "token=value"
        const itemString = cookieString?.split(/\s*;\s*/);
        itemString.forEach((pairs) => {
            //* ["token","value"]
            const pair = pairs.split(/\s*=\s*/);
            cookies[pair[0]] = pair.splice(1).join("=");
        });
    }
    return cookies;
};

//* 열거형 타입의 원소 개수를 알려 주는 함수
export const getEnumLength = (enumObject: any) => {
    const keys = Object.keys(enumObject);
    // enum의 값이 숫자이면 두 개 씩 들어가므로 문자열만 계산한다.
    return keys.reduce(
        (acc, key) => (typeof enumObject[key] === 'string' ? acc + 1 : acc),
        0,
    );
}

//* 열거형 타입에 존재하는 값인지 검사하는 함수
export const isValidEnumValue = (enumObject: any, value: number | string) => {
    if (typeof value === 'number'){
        return !!enumObject[value];
    } else {
        return (
            Object.keys(enumObject)
                .filter(key => isNaN(Number(key)))
                .some(key => enumObject[key] === value)
        );
    }
}

