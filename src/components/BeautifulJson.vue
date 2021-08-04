<template>
  <div id="beautifulJson">
    <div id="jsonData">
      <textarea v-model="jsonStr"></textarea>
    </div>

    <div id="json_viewer">
      <json-viewer
        :value="json"
        :expand-depth=5
        copyable
        boxed></json-viewer>
    </div>

  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: "BeautifulJson",
  components: {
    JsonViewer
  },
  data() {
    return {
      jsonStr: "",
      json: { /* json data*/}
    }
  },
  methods: {
    objParse: function (val) {
      for (let retKey in val) {
        if (typeof val[retKey] == "string") {
          val[retKey] = this.str2json(val[retKey])
        } else if (typeof val[retKey] == "object") {
          val[retKey] = this.objParse(val[retKey])
        }
      }
      return val
    },
    str2json: function (str) {
      try {
        let ret = JSON.parse(str);
        for (let retKey in ret) {
          if (typeof ret[retKey] == "string") {
            ret[retKey] = this.str2json(ret[retKey])
          } else if (typeof ret[retKey] == "object") {
            ret[retKey] = this.objParse(ret[retKey])
          }
        }
        return ret
      } catch (e) {
        return str
      }
    }
  },
  watch: {
    jsonStr: function (val) {
      this.json = this.str2json(val)
    }
  }
}
</script>

<style scoped>
#jsonData {
  width: 40%;
  height: 600px;
  float: left;
}

#jsonData textarea {
  width: 100%;
  height: 100%;
}

#beautifulJson {
  float: left;
  width: 100%;
}

#json_viewer {
  float: left;
  width: 40%;
  height: 600px;
  margin-left: 20px;
}

</style>
