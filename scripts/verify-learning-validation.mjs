import assert from "node:assert/strict";
import {sameOrigin,validMediaPath,validPaymentReference,validRange} from "../src/lib/learning-validation.ts";
assert.ok(sameOrigin(new Request("https://nabta.test/api",{headers:{origin:"https://nabta.test"}})));
for(const origin of ["https://evil.test","null","https://nabta.test.evil.test"])assert.equal(sameOrigin(new Request("https://nabta.test/api",{headers:{origin}})),false);
for(const ref of ["","<script>","x".repeat(101),null])assert.equal(validPaymentReference(ref),false);
assert.ok(validPaymentReference("INSTAPAY-123456"));
for(const path of ["../lesson.mp4","https://evil.test/file.mp4","file.html",null])assert.equal(validMediaPath(path,"mp4"),false);
assert.ok(validMediaPath("course/lesson-01.mp4","mp4"));
for(const range of ["bytes=0-1,2-3","bytes=abc","other=0-5"])assert.equal(validRange(range),false);
assert.ok(validRange("bytes=0-"));assert.ok(validRange("bytes=-100"));
console.log("Origin, payment input, media path and range validation verified.");

import { readSmallJson } from "../src/lib/learning-validation.ts";
assert.deepEqual(await readSmallJson(new Request("https://nabta.test",{method:"POST",body:JSON.stringify({reference:"PAYMENT123"})})),{reference:"PAYMENT123"});
for(const body of ["null","[]","false",'{"value":"'+"x".repeat(5000)+'"}']){
 await assert.rejects(()=>readSmallJson(new Request("https://nabta.test",{method:"POST",body})));
}
console.log("Bounded JSON body and object shape verified.");

