<template>

  <div id="json2struce">
    <div id="json">
      <textarea v-model="json_data"></textarea>
    </div>

    <el-button style="float: left;margin-top: 250px" type="primary" @click="run"> > </el-button>

    <div id="struct" v-highlight>
      <pre><code v-html="go_struct"></code></pre>
    </div>


  </div>

</template>

<script>
  export default {
    name: "Json2Struct",
    data() {
      return {
        json_data: `{
    "str":"string",
    "number":123,
    "boolean":true,
    "array":[
        1,
        2,
        3
    ],
    "obj":{
        "t":"1"
    }
}`,
        go_struct: ""
      }
    },
    methods: {
      run: function () {
        let obj = JSON.parse(this.json_data)
        this.go_struct = this.json2struct(obj)
      },
      json2struct: function (obj) {
        let struct = `struct{`
        for (let key in obj) {
          let keyName = this.firstUpperCase(key)
          if ((typeof obj[key]) === "object" && !(obj[key] instanceof Array)) {
            struct += `
        ` + keyName + " " + this.json2struct(obj[key]) + `\`db:"${key}" json:"${key}"\``
          } else {
            let valueType = this.jsType2goType(obj[key])
            struct += `
        ${keyName} ${valueType} \`db:"${key}" json:"${key}"\``
          }
        }
        struct += "\n}"
        return struct
      },
      firstUpperCase: function (str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      },
      jsType2goType: function (v) {
        switch (typeof v) {
          case "bigint":
            return "int64"
          case "boolean":
            return "bool"
          case "number":
            if (v % 1 === 0) return "int64"
            return "float64"
          case "string":
            return "string"
          case "object":
            if (v instanceof Array) return "[]" + this.jsType2goType(v[0])
            return "interface{}"
          default:
            return "interface{}"
        }
      }
    }
  }
</script>

<style scoped>
  #json {
    width: 40%;
    height: 600px;
    float: left;
    margin-right: 16px;
  }

  #json textarea{
    width: 100%;
    height: 100%;
  }

  #struct{
    float: left;
    width: 40%;
    height: 600px;
    border: #2c3e50 1px solid;
    margin-left: 10px;
  }

</style>
