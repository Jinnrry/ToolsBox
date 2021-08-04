<template>
  <div>
    <textarea style="width: 40%;height: 600px;float: left" v-model="sql"></textarea>
    <el-button style="float: left;margin-top: 250px;margin-left: 10px;margin-right: 10px;" type="primary" @click="toStruct"> ></el-button>
    <textarea style="width: 40%;height: 600px;float: left" v-model="struct"></textarea>
  </div>
</template>

<script>

export default {
  name: "Sql2Struct",
  data() {
    return {
      struct: "",
      sql: 'CREATE TABLE `nglog` (\n' +
        ' `id` int unsigned NOT NULL AUTO_INCREMENT,\n' +
        ' `timestamp` datetime NOT NULL,\n' +
        ' `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `referer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `uri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `status` int NOT NULL,\n' +
        ' `httphost` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `host` varchar(22) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `size` int NOT NULL,\n' +
        ' `respnsetime` float NOT NULL,\n' +
        ' `upstremtime` float NOT NULL,\n' +
        ' `upstremhost` varchar(22) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `xff` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `request` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `clientip` varchar(22) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n' +
        ' `bot` tinyint NOT NULL DEFAULT \'0\',\n' +
        ' PRIMARY KEY (`id`),\n' +
        ' KEY `idx_date` (`timestamp`) USING BTREE\n' +
        ') ENGINE=InnoDB AUTO_INCREMENT=184384 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    }
  },
  methods: {
    toStruct: function () {
      let struct = "struct {\n"
      let fileds = this.parseSql(this.sql)
      for (let i = 0; i < fileds.length; i++) {
        let ret = this.parseFiled(fileds[i])
        if (!ret) continue
        if (ret.comment) {
          struct += this.nametoUpperCase(ret.fieldName) + " " + this.sqlType2Golang(ret.fieldType, ret.unsigned) + " " + this.commentGen(ret.fieldName) + " //" + ret.comment + "\n"
        } else {
          struct += this.nametoUpperCase(ret.fieldName) + " " + this.sqlType2Golang(ret.fieldType, ret.unsigned) + " " + this.commentGen(ret.fieldName) + "\n"
        }
      }
      struct += "}"
      this.struct = struct
    },
    // 注解生成
    commentGen: function (key) {
      return '`db:"' + key + '" json:"' + key + '"`'
    },
    // 将名字转成驼峰命名规则
    nametoUpperCase: function (str) {
      return str.replace(/^\S/, s => s.toUpperCase()).replaceAll(/_\S/g, function (str) {
        return str[1].toUpperCase()
      })
    },
    sqlType2Golang: function (t, unsigned) {
      if (t.indexOf("char") >= 0) {
        return "string"
      } else if (t.indexOf("int") > 0) {
        if (!unsigned) {
          return "int"
        }
        return "uint"
      } else if (t.indexOf("decimal")) {
        return "float64"
      }
      return "string"
    },
    // 解析一个字段的定义
    parseFiled: function (str) {
      if (str.match(/^PRIMARY KEY/i) || str.match(/^KEY/i)) {
        return false
      }

      let info = str.split(" ")


      let ret = {
        "fieldName": info[0],
        "fieldType": info[1],
        "unsigned": false,
        "comment": ""
      }
      for (let i = 2; i < info.length; i++) {
        if (info[i] === "unsigned" || info[i] === "UNSIGNED") {
          ret.unsigned = true
        }
      }

      let comment = str.match(/comment .*/i)
      if (comment) {
        ret.comment = comment[0].replace("comment", "").replace("COMMENT", "").trim().replaceAll(/'/g, "")
      }

      return ret
    },
    // 将整个sql解析成字段定义
    parseSql: function (sql_str) {
      // 只去sql的字段定义部分
      let spaceSql = sql_str.replace(/\s{2,}/g, " ")
      spaceSql = spaceSql.replaceAll(/\n/g, "");
      spaceSql = spaceSql.replace(/create table.*?\(/i, "");
      spaceSql = spaceSql.slice(0, spaceSql.lastIndexOf(")"))

      // 将sql按字段拆分
      let fields = []
      let inComment = false
      let inBrackets = false
      let start = 0
      for (let i = 0; i < spaceSql.length; i++) {
        if (spaceSql[i] === '\'' && spaceSql[i - 1] !== "\\") {
          inComment = !inComment
        }

        if (spaceSql[i] === '(') {
          inBrackets = true
        }
        if (spaceSql[i] === ')') {
          inBrackets = false
        }

        if (!inComment && !inBrackets && spaceSql[i] === ",") {
          fields.push(spaceSql.slice(start, i).trim().replaceAll(/`/g, ''))
          start = i + 1
        }
      }
      fields.push(spaceSql.slice(start, spaceSql.length).trim().replaceAll(/`/g, ''))
      return fields

    }


  }
}
</script>

<style scoped>

</style>
