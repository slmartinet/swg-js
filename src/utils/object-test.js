/**
 * Copyright 2017 The __PROJECT__ Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


 import {map} from './object';

 describe('map', () => {
   it('should return a map-like object', () => {
     const obj = {a: 1, b: 2};
     expect(map(obj)).should.be.an.object;
     expect(map(obj)).to.deep.equal(obj);
     expect(map()).to.deep.equal({});
   });
 });
