const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')

const List = []
const count = 10
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      title: '@csentence(1, 2)',
      'status|1': ['published', 'draft', 'deleted'],
      author: '@cname',
      datetime: '@datetime',
      pageViews: '@integer(300, 5000)',
      img: handleRandomImage(200, 200),
      smallImg: handleRandomImage(40, 40),
      switch: '@boolean',
      percent: '@integer(80,99)',
      apiurl: '@url("http", "api.com")',
      'apiname|1': [
        '企业基础信息',
        '营业执照',
        '法人信息',
        '企业资质',
        '规上企业信息',
        '人员基础信息',
        '人员信用信息',
        '人员卫生许可证',
        '企业不动产信息',
        '环境信息',
        '广告牌设置信息',
        '占道经营',
        '垃圾处置及分类',
      ],
      'busname|1': ['市监', '公安', '社会事业局', '资规局', '审批局', '执法局'],
      'scenename|1': ['餐饮业检查一件事', '场景2', '场景3'],
    })
  )
}

module.exports = [
  {
    url: '/table/getList',
    type: 'post',
    response(config) {
      if (!config.body) {
        return {
          code: 200,
          msg: 'success',
          totalCount: count,
          data: mock({
            'data|50': [
              {
                id: '@id',
                title: '@csentence(1, 2)',
                'status|1': ['published', 'draft', 'deleted'],
                author: '@cname',
                datetime: '@datetime',
                pageViews: '@integer(300, 5000)',
                img: handleRandomImage(200, 200),
                smallImg: handleRandomImage(40, 40),
                switch: '@boolean',
                percent: '@integer(80,99)',
                apiurl: '@url("http", "api.com")',
                'apiname|1': [
                  '企业基础信息',
                  '营业执照',
                  '法人信息',
                  '企业资质',
                  '规上企业信息',
                  '人员基础信息',
                  '人员信用信息',
                  '人员卫生许可证',
                  '企业不动产信息',
                  '环境信息',
                  '广告牌设置信息',
                  '占道经营',
                  '垃圾处置及分类',
                ],
                'busname|1': [
                  '市监',
                  '公安',
                  '社会事业局',
                  '资规局',
                  '审批局',
                  '执法局',
                ],
                'scenename|1': ['餐饮业检查一件事', '场景2', '场景3'],
              },
            ],
          }).data,
        }
      }
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount: count,
        data: pageList,
      }
    },
  },
  {
    url: '/table/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/table/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
