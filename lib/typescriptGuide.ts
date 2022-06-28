import { type } from "os";

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
type Pick<T, K extends keyof T> = { [P in K]: T[P]}; //Pick은 인터페이스와 T와 해당 인터페이스의 속성 이름 K를 입력으로 받는다.
type T3 = Pick<Person, 'name' | 'age'>;
// type T1 = { name: string, age: number; };

//* Record 내장 타입 - 입력된 모든 속성을 같은 타입으로 만들어 주는 맵드 타입이다.
type Record<K extends string, T> = { [P in K]: T}; //K는 문자열의 서브타입이다. K로 입력되는 모든 문자열을 속성 이름으로 하면서 T를 각 속성의 타입으로 만든다.
type T4 = Record<'p1' | 'p2', Person>;
// type T4 = { p1: Person; , p2: Person; }

//* 맵드 타입을 이용한 FRUIT_PRICE 타입 정의
enum Fruit {
    Apple,
    Banana,
    Orange,
}
const FRUIT_PRICE: { [key in Fruit]: number } = {
    [Fruit.Apple]: 1000,
    [Fruit.Banana]: 1500,
    [Fruit.Orange]: 3000,       // 모든 속석을 추가해야 타입 에러가 나지 않는다.
}

//* 조건부 타입(conditional) : 입력된 제네릭 타입에 따라 타입을 결정할 수 있는 기능이다. 조건부 타입은 extends 키워드와 ? 기호를 사용해서 정의한다.
// T extends U ? X : Y - 조건부 타입의 기본 구조다. 입력된 제네릭 타입 T가 타입 U의  서브타입이면 타입 X를 사용하고 그렇지 않으면 Y를 사용한다.
type IsStringType<T> = T extends string ? 'yes' : 'no'; // 문자열의 서브타입이 입력되면 yes를 사용하고, 그렇지 않으면 no를 사용하는 조건부 타입니다.
type T5_1 = IsStringType<string>; // 'yes'
type T5_2 = IsStringType<number>; // 'no'
const t5: IsStringType<3> = 'no';

//* IsStringType 타입에 유니온 타임을 입력한 결과
type T6_1 = IsStringType<string | number>; // 'yes' | 'no'
// 각 타입을 하나씩 검사해서 타입을 결정하고 최종 결과는 유니온 타입으로 만들어진다.
type T6_2 = IsStringType<string> | IsStringType<number>;
// T6_1 과 T6_2는 결과적으로 같은 타입이다.

//* Exclude, Extract 내장 타입
//* 타입스크립트에 내장된 Exclude, Extract 타입은 조건부 타입으로 만들 수 있다.
//* 다음은 Exclude, Extract 타입의 정의와 사용 예를 보여 주는 코드다.
type T7_1 = number | string | never; // string | number
// 유나온 타입에 있는 never타입은 제고되는데,  이는 조건부 타입에서 자주 사용된는 기능이다.
//type Exclude<T, U> = T extends U ? never : T; // U의 서브타입을 제거해 주는 유틸리티 타입이다.
type T7_2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7
type T7_3 = Exclude<string | number | (() => void), Function>; // string | number
//type Extract<T, U> = T extends U ? T : never;
// Exclude 와 반대로 동작한다.
type T7_4 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5

//* ReturnType 내장 타입
//* 조건부 타입으로 만들어진 ReturnType 내장 타입은 함수의 반환 타입을 추출한다. 
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// 입력된 타입 T가 함수이면 함수의 반환 타입이 사용되고, 그렇지 않으면 any타입이 사용된다. 타입 추론을 위해 infer 키워드를 사용했다.
// infer 키워드 덕분에 함수의 반환 타입을 R이라는 변수에 담을 수 있다. 
type T8 = ReturnType<() => string>; // string;
function f81(s: string): number {
    return s.length;
}
type T8_2 = ReturnType<typeof f81>; // number;


//* infer 키워드는 조건부 타입을 정의할 떄 extends 키워드 뒤에 사용된다. infer 키워드는 다음과 같이 중첩해서 사용할 수 있다.
type Unpacked<T> = T extends (infer U)[]            // 타입 T가 U의 배열이면 U가 사용된다. 
    ? U 
    : T extends (...args: any[]) => infer U         // 타입 T가 함수면 반환 타입이 사용돤다.
        ? U 
        : T extends Promise<infer U>                // 프라미스면 프라미스에 입력된 제네릭 타입이 사용된다.
            ? U     
            : T;                                    // 아무것도 만족하지 않기 떄문에 자기 자신이 되다.                        
type T9_1 = Unpacked<string>; // string
type T9_2 = Unpacked<string[]> // string
type T9_3 = Unpacked<() => string> // string
type T9_4 = Unpacked<Promise<string>>; //string
type T9_5 = Unpacked<Promise<string>[]>; // Promise<string> - Promise<string>의 배열이므로 Promise<string>이 된다.
type T9_6 = Unpacked<Unpacked<Promise<string>[]>>; // string

//* 조건부 타입을 사용해서 몇 가지 유틸리티 타입을 만들어 보자. 다음은 인터페이스에서 문자열 속성만 추출해서 사용하는 두 개의 유틸리티 타입을 보여준다.
type StringPropertyNames<T> = {                                 // 타입 T에서 값이 문자열인 모든 속성의 이름을 유니온 타입으로 만들어 주는 유틸리티 타입이다.
    [K in keyof T]: T[K] extends String ? K : never
}[keyof T];                                                     // [keyof T]는 인터페이스에서 모든 속성의 타입을 유니온으로 추출한다. 이떄 never 타입은 제거된다.
type StringProperties<T> = Pick<T, StringPropertyNames<T>>;     // StringProperties는 인터페이스에서 문자열인 모든 속성을 추출하는 유틸리티 타입이다.
interface Person {
    name: string;
    age: number;
    nation: string;
}
type T10_1 = StringPropertyNames<Person>; // "name" | "nation"
type T10_2 = StringProperties<Person>; // { name: string, nation: string; }

//* 다음은 인터페이스에서 일부 속성만 제거해 주는 유틸리티 타입이다.
//type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
type T11_1 = Omit<Person, 'nation' | 'age'>
const p11: T11_1 = {
    name: 'mike',
};

//* 인터페이스를 덮어쓰는 유틸리티 타입
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
type T12_1 = Overwrite<Person, { age: string; tel?: string }>;
const p12: T12_1 = {
    name: 'mike',
    nation: 'korean',
    age: '123',
    tel: "123123123",
}

//* 타입 추론 - 명시적으로 타입 코드를 작성하지 않아도 타입스크립트가 타입을 추론할 수 잇는 경우가 많다.

//* let 변수의 타입 추론
let v1 = 123; // number 타입이 된다.
let v2 = 'abc' // string
//v1 = 'a'; //타입에러
//v2 = 456; //타입에러

//* const 
const v3 = 123;
const v4 = 'abc';
let v5: typeof v3 | typeof v4; // v5: 123 | 'abc'

//* 배열
const arr1 = [10,20,30]; // number[]
const [n1,n2,n3] = arr1; // number[]
// arr1.push('a');       // type 에러

const arr2 = { id: "asss", age: 123, language: 'korean'};
// arr2: { id: string;, age: number;, language: string; }
const { id, age, language } = arr2;
//console.log(id === age); // 비교 타입 에러

//* 여러 가지 타입으로 구성된 배열의 타입 추론
interface Car {
    name: string,
    cc: number,
}
interface SuvCar extends Car {
    Awd: boolean;
}
interface ElectronicCar extends Car {
    camera: boolean;
}
const car1: Car = { name: 'car1', cc: 2000};
const car2: SuvCar = { name: 'car1', cc: 2000, Awd: true};
const car3: ElectronicCar = { name: 'car1', cc: 2000, camera: true};
const carArr1 = [car1, car2, car3];  // Car
const carArr2 = [car2, car3];        // (SuvCar, ElectronicCar)[] 

//* 함수 매개변수와 반환값에 대한 타입 추론
function func1(a = 'abc', b = 10) {
    return `${a} ${b}`;
}
// func1(3,6); // 타입에러
// const fv1: number = func1('a', 1);  // 타입 에러

function func2(value: number) {
    if (value < 10) {
        return value;
    } else {
        return `${value} is too big`;
    }
}
// return 타입이 여러번 등장해도 타입 추론은 잘 동작한다. 이 함수의 반환 타입은 number | string이 된다.

//* 타입 가드(guard) - 조건문을 이용해 타입의 범위를 좁히는 기능이다.

//* 타입 가드를 활용하지 않는 코드
function print(value: number | string) {
    if (typeof value === 'number') {                // typeof 를 이용해서 number인지 검사
        console.log((value as number).toFixed(2));  // 타입 가드가 없다면 as 키워드를 사용해서 타입스크립트에게 value는 숫자라고 알려야 한다.
    } else {
        console.log((value as string).trim());      // 이를 타입 단언
    }
}

//* typeof 키워드 타입가드 활용
function print1(value: number | string) {
    if (typeof value === 'number') {                // typeof 를 이용해서 number인지 검사
        console.log(value.toFixed(2));              // typeof 타입가드 덕분에 number인지 추론
    } else {
        console.log(value.trim());                  // 타입 가드 타입이 number | string이므로 else는 string임.
    }
}

class Person2 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
class Product2 {
    name: string;
    price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}
//* instanceof 키워드 타입가드 활용 
//* interface경우에는 instanceof 키워드를 사용할 수 없다. instanceof 키워드 오른쪽에는 생성자 함수만 올 수 있기 때문이다.
function print2(value: Person2 | Product2) {
    console.log(value.name);
    if (value instanceof Person2) {                
        console.log(value.age);                    // instanceof 타입가드 덕분에 age속성에 접근 가능
    } else {
        console.log(value.price);                  // 타입 가드는 else 블록에서 value의 타입이 Product2라고 인식한다.
    }
}

//* 식별 가능한 유니온 타입
// 인터페이스를 구별하기 위한 한가지 방법은 식별 가능한 유니온(discrominated union)타입을 이용하는 것이다.?
// 인터페이스에서 식별 가능한 유니온 타입은 같은 이름의 속성을 정의하고 속성의 타입은 모두 겹치지 않게 정의하면 된다.

interface IPerson2 {
    type: 'person';
    name: string;
    age: number;
}
interface IProduct2 {
    type: 'product';
    name: string;
    price: number;
}
function print3(value: IPerson2 | IProduct2) {
    if (value.type === 'person') {                  // 두 인터페이스에 type이라는 같은 이름의 속성을 정의한다.
        console.log(value.age);
    } else {
        console.log(value.price);
    }
}
