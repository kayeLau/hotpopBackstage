class Util{
    static moneyFormatter(val,fix = 2){
        if(fix < 0)return;
        console.log(fix)
        let str = String(val.toFixed(fix)); // 控制小數後位數
        let stopPoint = fix === 0 ? str.length : str.indexOf(".");
        let intSum = str.substring(0,stopPoint).replace( /\B(?=(?:\d{3})+$)/g, ',' );// 整数部分
        if(fix === 0){
            return intSum
        }
        let dot = str.substring(str.indexOf(".")); // 小数部分搜索
        let res = intSum + dot;
        return res;
    }

    static moneyFormatterInChineseSuffix(val){
        let base = 1;
        let suffix = '';
        if (val >= 100000000){
            base = 100000000;
            suffix = '億';
        } else if (val >= 10000){
            base = 10000;
            suffix = '萬';
        }
        let str = String((val / base).toFixed(2));
        let intSum = str.substring(0, str.indexOf('.')).replace( /\B(?=(?:\d{3})+$)/g, ',');
        let dot = str.substring(str.indexOf('.'));
        // 去小數位無效的零
        let dotIndex = 2;
        while (dot[dotIndex] === '0' || dot[dotIndex] === '.'){
            dotIndex--;
        }
        dot = dot.substring(0, dotIndex + 1);
        let ret = intSum + dot + suffix;
        return ret;
    }

    static isThisWeek(day) {
        let today = new Date();
        today.setHours(0);
        let weedday = today.getDay() - 1;
        let time = today.getTime();
        let ans = day.getTime() - time - weedday * 24 * 3600 * 1000;
        return ans > 0 ? true : false;
    }
}

export {
    Util
}