BOJHelper
=========
<pre><font color="#6C99BB">~/workspace/boj </font><font color="#535353"> </font> 
<font color="#D197D9">❯</font> boj init 1000
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">1.0.2</span>
     Making problem directory...
     Parsing test cases...
<span style="background-color:#A5C261">SUCC</span> Found 1 test cases.
<span style="background-color:#A5C261">SUCC</span> Successfully initialized.
</pre>
백준 테스트 도구<br/>
문제 번호를 통해 테스트케이스들을 파싱해 오고, 해당 케이스를 일괄적으로 테스트하는 기능을 제공한다. 
# 설치
node, npm이 필요하다.
```bash
sudo npm i -g bojhelper
```
이후 boj 키워드를 통해 사용할 수 있다.
# 사용법
## 문제 가져오기
<pre><font color="#6C99BB">~/workspace/boj </font><font color="#535353"> </font> 
<font color="#D197D9">❯</font> boj init 1000
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">1.0.2</span>
     Making problem directory...
     Parsing test cases...
<span style="background-color:#A5C261">SUCC</span> Found 1 test cases.
<span style="background-color:#A5C261">SUCC</span> Successfully initialized.
</pre>
`boj init [problem_number]` 커맨드를 통해 해당 문제 번호에 해당하는 디렉터리를 만들고, 그 안에 테스트케이스와 작성할 코드 파일을 만든다. 테스트케이스는 자동 파싱되어 `testcases.json`에 저장된다.
* [problem_number]/: 문제 번호
* `testcases.json`: 파싱된 테스트 케이스들. 임의로 케이스를 추가해도 테스트가 가능하다.
* `code.[ext]`: 코드를 작성할 파일이다. 이 곳에 작성해야 테스트가 가능하다.
## 테스트
<pre><font color="#6C99BB">~/workspace/boj/1000 </font><font color="#535353"> </font>
<font color="#D197D9">❯</font> boj test
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">1.0.2</span>
     <b>Test Case #0</b>
<span style="background-color:#A5C261">SUCC</span> Correct!</pre>
`boj test` 커맨드를 통해 테스트케이스들을 이용해 테스트한다. 틀릴 시 로그가 남는다.
<pre><font color="#BED6FF"># Input</font>
1 2

<font color="#BED6FF"># Correct Output</font>
3

<font color="#BED6FF"># Failed Output</font>
2

</pre>
## 설정
<pre><font color="#6C99BB">~/workspace/boj/1000 </font><font color="#535353"> </font> 
<font color="#D25252">❯</font> boj setting py python3
     <font color="#6C99BB">BojHelper</font> <span style="background-color:#6C99BB">1.0.2</span>
<span style="background-color:#A5C261">SUCC</span> Setting successfully changed.
</pre>
`boj setting [ext] [exe]` 커맨드를 통해 언어 설정을 변경한다. ext는 코드 파일 확장자, exe는 테스트 시 실행 명령이다. 기본값으로 py, python3으로 설정되어 있다.
## TODO
* 제출 기능
* 에러 바인딩 및 에러 메시지 자세하게