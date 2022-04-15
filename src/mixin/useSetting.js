export default function(){
    function timeFormatTooltip(val) {
      let minute = String(val).split(".")[1] === "5" ? "30" : "00";
      return String(val).split(".")[0] + ":" + minute;
    }

    function timeFormat(val) {
      let res = "";
      if (Array.isArray(val)) {
        val.forEach(item => {
          res += timeFormatTooltip(item);
          res += " - ";
        });
        res = res.substring(0, res.length - 3);
      } else {
        res = timeFormatTooltip(val);
      }
      return res;
    }

    let bookingInput = [
        {
          type: "hidden",
          label: "最後修改時間",
          key: "lastEditTime",
          value: ""
        },
        {
          type: "inputString",
          label: "分店編號",
          key: "shopid",
          value: '',
          placeholder: "",
          span: 6,
          readonly: true
        },
        {
          type: "inputString",
          label: "分店名稱",
          key: "shopName",
          value: "",
          placeholder: "請輸入分店名稱",
          span: 6
        },
        {
          type: "timeselect",
          label: "截止訂座時間",
          key: "lastOrder",
          value: "",
          placeholder: "",
          span: 6,
          start: "15:00",
          end: "24:00",
          step: "00:30"
        },
        {
          type: "group",
          name: "訂座時段",
          children: [
            {
              type: "slider",
              label: "",
              key: "period",
              value: [0,0],
              placeholder: "",
              range: true,
              showStops: true,
              span: 20,
              max: 24,
              min: 12,
              step: 0.5,
              showmark: true,
              showvalue: true
            },
            {
              type: "selectgroup",
              label: "用餐時間",
              key: "mealTime",
              value:[],
              placeholder: "請選擇",
              span: 12,
              group: [
                {
                  options: [
                    {
                      value: "1hr",
                      label: "1hr"
                    },
                    {
                      value: "2hr",
                      label: "2hr"
                    },
                    {
                      value: "3hr",
                      label: "3hr"
                    },
                    {
                      value: "4hr",
                      label: "4hr"
                    }
                  ]
                },
                {
                  options: [
                    {
                      value: "0min",
                      label: "0min"
                    },
                    {
                      value: "15min",
                      label: "15min"
                    },
                    {
                      value: "30min",
                      label: "30min"
                    },
                    {
                      value: "45min",
                      label: "45min"
                    }
                  ]
                }
              ]
            },
            {
              type: "inputNumber",
              label: "位",
              key: "person",
              value: 0,
              placeholder: "",
              span: 10,
              description: "",
              max: 100,
              min: 0
            },
            {
              type: "select",
              label: "間距",
              key: "step",
              value: "",
              placeholder: "請選擇",
              span: 10,
              options: [
                {
                  value: "15min",
                  label: "15min"
                },
                {
                  value: "30min",
                  label: "30min"
                },
                {
                  value: "45min",
                  label: "45min"
                }
              ]
            }
          ]
        }
      ];

    return {
        bookingInput,
        timeFormat
    }
}