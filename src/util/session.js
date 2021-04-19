const SESSION_STOR = window.sessionStorage;
const LOCAL_STOR = window.localStorage;

class SessionManager {
  put(key, value, isLocal) {
    if (!key) {
      return;
    }

    try {
      const sessionValue = JSON.stringify(value);
      isLocal ? LOCAL_STOR.setItem(key, sessionValue) : SESSION_STOR.setItem(key, sessionValue);
    } catch (e) {
      console.warn('json parse error');
    }
  }

  get(key, isLocal) {
    let result;

    if (!key) {
      return null;
    }
    
    const storageResult = isLocal ? LOCAL_STOR.getItem(key) : SESSION_STOR.getItem(key);

    try {
      result = JSON.parse(storageResult);
    } catch (e) {
      console.warn('json parse error');
    }

    return result;
  }

  remove(key, isLocal) {
    isLocal ? LOCAL_STOR.removeItem(key) : SESSION_STOR.removeItem(key);
  }
  
  clear(isLocal) {
    isLocal ? LOCAL_STOR.clear() : SESSION_STOR.clear();
  }
}

const session = new SessionManager();
export default session;