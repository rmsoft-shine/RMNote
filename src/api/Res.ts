export default class Res<T> {
  ok: boolean; // api 성공 여부 반환
  payload: null | T; // api 응답 결과 데이터 반환
  error: null | Error;
  constructor() {
    this.ok = false;
    this.payload = null;
    this.error = null;
  }

  setOk() {
    this.ok = true;
  }

  setData(payload: T) {
    this.payload = payload;
  }

  setError(error: Error) {
    this.error = error;
  }
}
