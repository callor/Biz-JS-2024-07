# NodeJS, Express Web Application Service

- NodeJS 는 JavaScript 를 사용하여 Back end Service 를 구현하기 위한 컨셉으로 탄생한 도구이다
- 오늘날 JavaScript 의 인기와 영광이 있도록 만든 도구이다
- NodeJS 만으로 Web Application Service 를 구현하기에는 많은 어려움이 있다. 그래서 NodeJS 와 함께 사용하는 Web Application FramworkWork 들이 있는데, 초창기 부터 대표적으로 많이 사용하던 도구가 express 이다.

## express

- express 는 NodeJS 로 WAS 를 구현할때 router 개념을 사용하여 매우 쉽게 서비스를 구현할수 있도록 만들어 준다.
- 또한 express-generator 라는 도구를 제공하여 프로젝트를 쉽게 만들 수 있도록 도와주고 있다.
- 아쉽게도 express-generator 는 commonJS 방식으로 코드를 생성하여 새로운 JS 문법보다 다소 오래된 형태로 프로젝트를 생성한다.
- 새로운 프로젝트에서는 module 방식으로 구현을 할 것이고, 프로젝트 생성 도구로 express-21c 라는 도구를 사용할 것이다

## `NodeJS, Express` 프로젝트 생성하기

- 기본 NodeJS Express 프로젝트

```bash
npx express-21c [project]
```

- MySQL, Sequelize 를 포함한 DBMS 프로젝트

```bash
npx express-21c [project] -s
```
