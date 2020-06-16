<template>
  <Card>
    <div>
      <Row style="padding: 20px">
        <i-col span="6">
          开始时间：
          <Date-picker type="date" placeholder="选择日期" style="width: 140px"></Date-picker>
        </i-col>
        <i-col span="6">
          结束时间：
          <Date-picker type="date" placeholder="选择日期" style="width: 140px"></Date-picker>
        </i-col>
        <i-col span="6">
          代理商名称：
          <i-select :model.sync="model1" style="width:140px">
            <i-option v-for="item in proxyList" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </i-col>
        <i-col span="6">
          <Button type="primary">
            查询
          </Button>
        </i-col>
      </Row>
      <Card style="margin:20px">
        <Row style="margin-top:20px">
          <i-col span="8" style="text-align: center">
            实收金额
          </i-col>
          <i-col span="8" style="text-align: center">
            退款金额
          </i-col>
          <i-col span="8" style="text-align: center">
            交易净额
          </i-col>
        </Row>
        <Row style="margin-top:20px">
          <i-col span="8" style="text-align: center">
            {{100}}
          </i-col>
          <i-col span="8" style="text-align: center">
            {{100}}
          </i-col>
          <i-col span="8" style="text-align: center">
            {{100}}
          </i-col>
        </Row>
        <Row style="margin-top:30px">
          <i-col span="8" style="text-align: center">
            交易笔数
          </i-col>
          <i-col span="8" style="text-align: center">
            退款笔数
          </i-col>
          <i-col span="8" style="text-align: center">
            分润金额
          </i-col>
        </Row>
        <Row style="margin-top:20px">
          <i-col span="8" style="text-align: center">
            {{100}}
          </i-col>
          <i-col span="8" style="text-align: center">
            {{100}}
          </i-col>
          <i-col span="8" style="text-align: center">
            {{100}}
          </i-col>
        </Row>
      </Card>
      <div style="text-align: right">
        <Button style="margin: 20px">
          导出EXCEL
        </Button>
      </div>
      <Table style="margin:20px" :columns="columns1" :data="tableData">

      </Table>
    </div>

  </Card>
</template>

<script>
  import './query.less'

  export default {
    name: "query1",
    data() {
      return {
        proxyList: [
          {
            value: 'beijing',
            label: '代理1'
          },
          {
            value: 'shanghai',
            label: '代理2'
          },
          {
            value: 'shenzhen',
            label: '代理3'
          },
          {
            value: 'hangzhou',
            label: '代理4'
          },
          {
            value: 'nanjing',
            label: '代理5'
          },
          {
            value: 'chongqing',
            label: '代理6'
          }
        ],
        model1: '',
        columns1: [
          {
            title: '交易时间',
            key: 'time'
          },
          {
            title: '代理商名称',
            key: 'proxyName'
          },
          {
            title: '商户名称',
            key: 'shopName'
          },
          {
            title: '交易金额',
            key: 'tradeMoney'
          },
          {
            title: '交易笔数',
            key: 'tradeNumber'
          },
          {
            title: '费率%',
            key: 'rate'
          },
          {
            title: '分润金额',
            key: 'profit'
          },
          {
            title: '代理分润金额',
            key: 'proxyProfit'
          },
        ],
        tableData: [
          {
            time: '2019-11-15',
            proxyName: '代理1',
            shopName: '北京市朝阳区芍药居',
            tradeMoney: 123123123,
            tradeNumber: 234234234,
            rate: '0.38%',
            profit: 123123123,
            proxyProfit: 123123,
          },
          {
            time: '2019-11-15',
            proxyName: '代理1',
            shopName: '北京市朝阳区芍药居',
            tradeMoney: 123123123,
            tradeNumber: 234234234,
            rate: '0.38%',
            profit: 123123123,
            proxyProfit: 123123,
          },
          {
            time: '2019-11-15',
            proxyName: '代理1',
            shopName: '北京市朝阳区芍药居',
            tradeMoney: 123123123,
            tradeNumber: 234234234,
            rate: '0.38%',
            profit: 123123123,
            proxyProfit: 123123,
          },
          {
            time: '2019-11-15',
            proxyName: '代理1',
            shopName: '北京市朝阳区芍药居',
            tradeMoney: 123123123,
            tradeNumber: 234234234,
            rate: '0.38%',
            profit: 123123123,
            proxyProfit: 123123,
          },
        ]
      }
    },
  }
</script>

<style scoped>

</style>
