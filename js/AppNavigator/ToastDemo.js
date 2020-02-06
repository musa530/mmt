/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import Toast from 'react-native-root-toast'
let ToastDemo={

}

ToastDemo.show=(message)=>{
    // Add a Toast on screen.
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER, //显示位置还有BOTTOM,TOP
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
        Toast.hide(toast);
    }, 2000);
}
module.exports = ToastDemo;