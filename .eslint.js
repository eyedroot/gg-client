module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "eslint:recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "rules": {
      "semi": ["error", "never"], // 세미콜론을 사용하지 않도록 설정
      "quotes": ["error", "double"], // 따옴표를 더블 쿼트로 설정
      "comma-dangle": ["error", "always-multiline"], // 객체의 마지막에 항상 콤마를 붙이도록 설정
  }
};
