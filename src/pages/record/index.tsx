import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import {queryOrderBuyListByUID} from '../../common/request/orderBuy'
import './index.scss'
import { OrderBuyArrayBto } from '../../common/resultType/OrderBuy'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import SmallTab from '../../components/smallTab/index'
import NopicTab from '../../components/noPicTab/index'

interface IndexProps{
}
interface IndexState{
  OrderListJoin: OrderBuyArrayBto[]
  OrderListPost: OrderBuyArrayBto[]
  OrderListCommets: OrderBuyArrayBto[]
  userID: string
  current:number
}

export default class Index extends Component<IndexProps,IndexState> {
  $instance = getCurrentInstance();
  constructor(props:IndexProps){
    super(props)
    this.state = {
      OrderListJoin: [] as OrderBuyArrayBto[],
      OrderListPost: [] as OrderBuyArrayBto[],
      OrderListCommets: [] as OrderBuyArrayBto[],
      userID: '0',
      current:0
      }
    }
  componentWillMount () { }

  async componentDidMount () {
    const router = this.$instance.router;
    const id = router?.params.id? router.params.id : '0';
    const res = await queryOrderBuyListByUID({userID: id});
    this.setState({
      OrderListJoin: res.data.Join,
      OrderListPost: res.data.Post,
      OrderListCommets: res.data.Comments,
      userID: id
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  refresh = async() => {
    const {userID} = this.state;
    const res = await queryOrderBuyListByUID({userID:userID});
      this.setState({
        OrderListJoin: res.data.Join,
        OrderListPost: res.data.Post,
        OrderListCommets: res.data.Comments,
    })
  }
  async onPullDownRefresh(){
    Taro.showNavigationBarLoading();
    this.refresh();
    Taro.hideNavigationBarLoading();
    Taro.stopPullDownRefresh();
}
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const {OrderListJoin,OrderListPost,OrderListCommets,current} = this.state;
    const tabList = [{ title: '我发起的' }, { title: '我参与的' }, { title: '我评论的' }];
    return (
        <View className='height'>
          <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={current} index={0} >
        <View className='tab-content'>
          {OrderListPost?.map((obj,index) => (
            obj.picture?
              <SmallTab orderList={obj} />
              :
              <NopicTab orderList={obj} />
          ))}
        </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
        {OrderListJoin?.map((obj,index) => (
            obj.picture?
              <SmallTab orderList={obj} />
              :
              <NopicTab orderList={obj} />
          ))}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
        {OrderListCommets?.map((obj,index) => (
            obj.picture?
              <SmallTab orderList={obj} />
              :
              <NopicTab orderList={obj} />
          ))}        </AtTabsPane>
      </AtTabs>
      </View>
    )
  }
}
