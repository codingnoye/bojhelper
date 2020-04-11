BOJHelper
=========
백준 테스트 도구<br>
문제 번호를 통해 테스트케이스들을 파싱해 오고, 해당 케이스를 일괄적으로 테스트하는 기능을 제공한다. 
# 설치
node, npm이 필요하다.
```bash
sudo npm i -g bojhelper
```
이후 boj 키워드를 통해 사용할 수 있다.
# 사용법
## 셋팅
<pre>
<font color="#6C99BB">~/workspace/boj </font><font color="#535353"> </font> 
<font color="#D197D9">❯</font> boj set cpp
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">2.0.1</span>
<span style="background-color:#A5C261">SUCC</span> Setting successfully changed.
</pre>
`boj set [ext]` 커맨드를 통해 앞으로 생성할 디렉터리의 코드 파일의 확장자명을 설정한다. (기본값 : `cpp`)<br>
사용가능한 확장자명 : `py`, `rb`, `go`, `js`, `cpp`, `c`, `java`, `kt`
## 문제 가져오기
<pre>
<font color="#6C99BB">~/workspace/boj </font><font color="#535353"> </font> 
<font color="#D197D9">❯</font> boj init 1000
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">2.0.1</span>
     <b>Current ext : cpp</b>
<span style="background-color:#A5C261">SUCC</span> Directory successfully created.
</pre>
`boj init [problem_number]` 커맨드를 통해 설정된 확장자명과 해당 문제 번호에 해당하는 디렉터리를 만들고, 그 안에 테스트케이스와 작성할 코드 파일을 만든다. 테스트케이스는 자동 파싱되어 `testcases.json`에 저장된다.
* `testcases.json`: 파싱된 테스트 케이스들. 임의로 케이스를 추가해도 테스트가 가능하다.
* `code.[ext]`: 코드를 작성할 파일이다. 이 곳에 작성해야 테스트가 가능하다.
* `log`: 발생한 오류들.
## 테스트
<pre>
<font color="#6C99BB">~/workspace/boj </font><font color="#535353"> </font>
<font color="#D197D9">❯</font> boj test 1000
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">2.0.0</span>
<span style="background-color:#A5C261">SUCC</span> Test Case #0 : Correct!
<span style="background-color:#d7524e">ERR</span> Test Case #1 : Failed..
<span style="background-color:#ffd400">WARN</span> Test Case #2 : Error
</pre>
`boj test [problem_number]` 커맨드를 통해 테스트케이스들을 이용해 테스트한다. 결과는 로그에 남는다.<br>
`Correct!`는 정답, `Failed..`는 오답, `Error`는 컴파일 또는 런타임 에러를 나타낸다.
```
Test Case #0
==========================================
# Input
1 2

# Correct Output
3

# Output
3
```



