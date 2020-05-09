import {AsyncStorage} from 'react-native';

export default class DataStore {
    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }
    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(url, (error, result)=>{
                if(!error) {
                    try {
                        resolve(JSON.parse(result));//解析
                    } catch(e) {
                        reject(e);
                        console.log(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }
    /**
     * 网络获取数据
     * @param url
     * @returns {Promise}
     */
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response)=>{
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((responseData) => {
                    this.saveData(url, responseData)
                    resolve(responseData);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }
    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchData(url) {
        return new Promise((resolve, reject)=>{
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimesValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url).then((data)=> {
                        resolve(this._wrapData(data));
                    }).catch((error)=>{
                        reject(error);
                    })
                }
            }).catch((error)=>{
                this.fetchNetData(url).then((data)=>{
                    resolve(this._wrapData(data));
                }).catch((error=>{
                    reject(error);
                }))
            })
        })
    }
    _wrapData() {
        return {data: data, timestamp: new Date().getTime()};
    }

    static checkTimesValid(timestamp) {
        const currentData = new Date() ;
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if(currentData.getMonth() !== targetDate.getMonth()) return false;
        if(currentData.getDate() !== targetDate.getDate()) return false;
        if(currentData.getHours() !== targetDate.getHours()) return false;
        return true;
    }
}