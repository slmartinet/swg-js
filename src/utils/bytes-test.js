/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
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

import {
  base64UrlDecodeToBytes,
  base64UrlEncodeFromBytes,
  bytesToString,
  stringToBytes,
  utf8DecodeSync,
  utf8EncodeSync,
} from './bytes';

describe('stringToBytes', function () {
  it('should map a sample string appropriately', () => {
    const bytes = stringToBytes('abÿ');
    expect(bytes.length).to.equal(3);
    expect(bytes[0]).to.equal(97);
    expect(bytes[1]).to.equal(98);
    expect(bytes[2]).to.equal(255);
  });

  it('should signal an error with a character >255', async () => {
    expect(() => stringToBytes('ab☺')).to.throw();
  });

  it('should convert bytes array to string', () => {
    const str = bytesToString(new Uint8Array([102, 111, 111]));
    expect(str).to.equal('foo');
  });
});

describe('utf8', function () {
  // Examples here courtesy of StackOverflow:
  // http://stackoverflow.com/questions/478201/how-to-test-an-application-for
  // -correct-encoding-e-g-utf-8

  const strings = [
    'ユーザー別サイト',
    '简体中文',
    '크로스플랫폼으로',
    'מדוריםמבוקשים',
    'أفضلالبحوث',
    'Σὲγνωρίζωἀπὸ',
    'ДесятуюМеждународную',
    'แผ่นดินฮั่นเสื่อมโทรมแสนสังเวช',
  ];

  const bytes = [
    [
      0xe3,
      0x83,
      0xa6,
      0xe3,
      0x83,
      0xbc,
      0xe3,
      0x82,
      0xb6,
      0xe3,
      0x83,
      0xbc,
      0xe5,
      0x88,
      0xa5,
      0xe3,
      0x82,
      0xb5,
      0xe3,
      0x82,
      0xa4,
      0xe3,
      0x83,
      0x88,
    ],
    [0xe7, 0xae, 0x80, 0xe4, 0xbd, 0x93, 0xe4, 0xb8, 0xad, 0xe6, 0x96, 0x87],
    [
      0xed,
      0x81,
      0xac,
      0xeb,
      0xa1,
      0x9c,
      0xec,
      0x8a,
      0xa4,
      0xed,
      0x94,
      0x8c,
      0xeb,
      0x9e,
      0xab,
      0xed,
      0x8f,
      0xbc,
      0xec,
      0x9c,
      0xbc,
      0xeb,
      0xa1,
      0x9c,
    ],
    [
      0xd7,
      0x9e,
      0xd7,
      0x93,
      0xd7,
      0x95,
      0xd7,
      0xa8,
      0xd7,
      0x99,
      0xd7,
      0x9d,
      0xd7,
      0x9e,
      0xd7,
      0x91,
      0xd7,
      0x95,
      0xd7,
      0xa7,
      0xd7,
      0xa9,
      0xd7,
      0x99,
      0xd7,
      0x9d,
    ],
    [
      0xd8,
      0xa3,
      0xd9,
      0x81,
      0xd8,
      0xb6,
      0xd9,
      0x84,
      0xd8,
      0xa7,
      0xd9,
      0x84,
      0xd8,
      0xa8,
      0xd8,
      0xad,
      0xd9,
      0x88,
      0xd8,
      0xab,
    ],
    [
      0xce,
      0xa3,
      0xe1,
      0xbd,
      0xb2,
      0xce,
      0xb3,
      0xce,
      0xbd,
      0xcf,
      0x89,
      0xcf,
      0x81,
      0xce,
      0xaf,
      0xce,
      0xb6,
      0xcf,
      0x89,
      0xe1,
      0xbc,
      0x80,
      0xcf,
      0x80,
      0xe1,
      0xbd,
      0xb8,
    ],
    [
      0xd0,
      0x94,
      0xd0,
      0xb5,
      0xd1,
      0x81,
      0xd1,
      0x8f,
      0xd1,
      0x82,
      0xd1,
      0x83,
      0xd1,
      0x8e,
      0xd0,
      0x9c,
      0xd0,
      0xb5,
      0xd0,
      0xb6,
      0xd0,
      0xb4,
      0xd1,
      0x83,
      0xd0,
      0xbd,
      0xd0,
      0xb0,
      0xd1,
      0x80,
      0xd0,
      0xbe,
      0xd0,
      0xb4,
      0xd0,
      0xbd,
      0xd1,
      0x83,
      0xd1,
      0x8e,
    ],
    [
      0xe0,
      0xb9,
      0x81,
      0xe0,
      0xb8,
      0x9c,
      0xe0,
      0xb9,
      0x88,
      0xe0,
      0xb8,
      0x99,
      0xe0,
      0xb8,
      0x94,
      0xe0,
      0xb8,
      0xb4,
      0xe0,
      0xb8,
      0x99,
      0xe0,
      0xb8,
      0xae,
      0xe0,
      0xb8,
      0xb1,
      0xe0,
      0xb9,
      0x88,
      0xe0,
      0xb8,
      0x99,
      0xe0,
      0xb9,
      0x80,
      0xe0,
      0xb8,
      0xaa,
      0xe0,
      0xb8,
      0xb7,
      0xe0,
      0xb9,
      0x88,
      0xe0,
      0xb8,
      0xad,
      0xe0,
      0xb8,
      0xa1,
      0xe0,
      0xb9,
      0x82,
      0xe0,
      0xb8,
      0x97,
      0xe0,
      0xb8,
      0xa3,
      0xe0,
      0xb8,
      0xa1,
      0xe0,
      0xb9,
      0x81,
      0xe0,
      0xb8,
      0xaa,
      0xe0,
      0xb8,
      0x99,
      0xe0,
      0xb8,
      0xaa,
      0xe0,
      0xb8,
      0xb1,
      0xe0,
      0xb8,
      0x87,
      0xe0,
      0xb9,
      0x80,
      0xe0,
      0xb8,
      0xa7,
      0xe0,
      0xb8,
      0x8a,
    ],
  ];

  function encoderTest() {
    for (let i = 0; i < strings.length; i++) {
      utf8EncodeSync(strings[i]).should.deep.equal(new Uint8Array(bytes[i]));
    }
  }

  function decoderTest() {
    for (let i = 0; i < strings.length; i++) {
      const data = strings[i];
      const utf8Bytes = utf8EncodeSync(data);
      const encoded = base64UrlEncodeFromBytes(utf8Bytes);
      expect(encoded).not.to.equal(data);
      expect(encoded).not.to.match(/[+/=]/g);
      const decodedUtf8Bytes = base64UrlDecodeToBytes(encoded);
      const decoded = utf8DecodeSync(decodedUtf8Bytes);
      expect(decoded).to.equal(data);
    }
  }

  it('should encode given string into utf-8 byte array', encoderTest);

  it('should decode correctly', decoderTest);

  describe('polyfills', () => {
    let TextDecoder;
    let TextEncoder;

    beforeEach(() => {
      TextDecoder = self.TextDecoder;
      TextEncoder = self.TextEncoder;
      self.TextDecoder = undefined;
      self.TextEncoder = undefined;
    });

    afterEach(() => {
      self.TextDecoder = TextDecoder;
      self.TextEncoder = TextEncoder;
    });

    it('should encode given string into utf-8 byte array', encoderTest);

    it('should decode correctly', decoderTest);
  });
});
