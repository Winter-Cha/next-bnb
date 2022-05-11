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

//* 스택 구현
export class Stack<D> {
    private items: D[] = [];
    push(item: D) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
}

interface Person {
    name: string;
    age: number;
}
interface Korean extends Person {
    liveInSeoul: boolean;
}

function swapProperty<T extends Person, K extends keyof Person>(
    p1: T, p2: T, name: K
): void {
    const temp = p1[name];
    p1[name] = p2[name];
    p2[name] = temp;
}

const p1: Korean = {
    name: '홍길동',
    age: 23,
    liveInSeoul: true,
}
const p2: Korean = {
    name: '김삿갓',
    age: 31,
    liveInSeoul: false,
}

swapProperty(p1, p2, 'age');

//* 두 개의 속성을 불 타입으로 만드는 맵드 타입
type T1 = { [K in 'prop1' | 'prop2']: boolean };
// { prop1: boolean; prop2: boolean; }

//* 인터페이스의 모든 속성을 불 타입 및 선택 속성으로 만들어주는 맵드 타입
type MakeBoolean<T> = { [P in keyof T]?: boolean };
const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;

//* 맵드 타입으로 만드는 partial 과 Readonly
type T2_1 = Person['name']; // string
type Readonly<T> = { readonly [P in keyof T]: T[P]};
type Partial<T> = { [P in keyof T]?: T[P] };
type T2_2 = Partial<Person>;
type T2_3 = Readonly<Person>;

//* Pick 내장 타입 - 인터페이스에서 원하는 속성만 추출할 떄 사용 된다. -다음은 맵드 타입으로 Pick을 구현한 코드다.