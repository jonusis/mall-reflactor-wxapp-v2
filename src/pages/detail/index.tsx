import { Component } from 'react'
import { View, Text,Image,Input,Button } from '@tarojs/components'
import './index.scss'
import { getCurrentInstance } from '@tarojs/taro';
import { addUserToBuyOrder, queryOrderBuyDetailById } from '../../common/request/orderBuy';
import { CommentsBto } from '../../common/resultType/Comments';
import Taro from '@tarojs/taro';
import { addComments } from '../../common/request/comment';

interface IndexProps{
}
interface IndexState{
  orderid: string,
  info: any,
  remark: string,
  comments: CommentsBto[],
  showButtonCheek:Boolean,
  showButtonEdit:Boolean,
  nickname:string
}
export default class Index extends Component<IndexProps,IndexState> {
  $instance = getCurrentInstance();
  constructor(props:IndexProps){
    super(props);
    this.state={
      orderid:'0',  
      info:{
      kind:0,
      location: "8号楼",
      timeBuy: "19：00",
      numNeed: 4,
      numExist: 2,
      picture: "",
      content: "内容没有加载出来噢~",
      heading: "请检查网络！",
      full: true,
      username:''
      },
      remark:'',
      comments:[],
      showButtonCheek:false,
      showButtonEdit:true,
      nickname:''
    }
  }
  componentWillMount () { }

  async componentDidMount () {
    const router = this.$instance.router;
    const id = router?.params.id? router.params.id : '0';
    this.setState({
      orderid:id
    })
    const res = await queryOrderBuyDetailById(id);
    this.setState({
      info:res.data,
      comments:res.data.comments,
      showButtonEdit: !res.data.full,
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  previewImage(){
    var Img = this.state.info.picture;
    var Arr = [Img];
    Taro.previewImage({
      current:Arr[0],
      urls:Arr,
    })
  }
  changeRemark(e){
    this.setState({
      remark:e.detail.value
    })
    return e.target.value;
  }
  async submitForm() {
    const {remark,orderid} = this.state;    
    if(remark !== ""){
    const res = await addComments({content:remark,userID:Taro.getStorageSync('userInfo').uid},orderid);
    if(res.code === 200){
      Taro.showToast({
        title:'发送成功',
        icon: 'success',
        duration: 2000
      })
      const res = await queryOrderBuyDetailById(orderid);
      this.setState({
        comments:res.data.comments,
        remark:''
      })
      Taro.hideToast();    
    }else{
      Taro.showToast({
        title:'发送失败',
        icon: 'error',
        duration: 2000
      })
    }
  }
}
  async toPostOrder(){
  const {orderid,info} = this.state;
  const res = await addUserToBuyOrder(orderid,Taro.getStorageSync('userInfo').uid);
  if(res.code === 200){
    Taro.showModal({
      title: res.data,
      content:`联系方式：\n
      qq：${info.qq}\n
      电话：${info.tel}\n
      微信：${info.wechat}\n
      按确定复制联系方式噢~
      `,
      success:(res)=> {
        if (res.confirm) {
          Taro.setClipboardData({
            data:`电话：${info.tel} qq：${info.qq} 微信：${info.wechat}`,
          })
        }
        this.onPullDownRefresh();
      }
    })
  }else{
    Taro.showModal({
      title:res.msg
    })
  }
}
  async onPullDownRefresh(){
  const {orderid} = this.state;
  Taro.showNavigationBarLoading();
  const res = await queryOrderBuyDetailById(orderid);
  this.setState({
    info:res.data,
    comments:res.data.comments,
  })
  Taro.hideNavigationBarLoading();
  Taro.stopPullDownRefresh();
}
  render () {
    const {remark,info,comments,showButtonEdit} = this.state;
    return (
      <View className='body'>
      <View className='content'>
      <View className='usrmasg'>
        {info.userPicture && <Image className='headsculpture' src={info.userPicture[0]}> </Image>}
        <View className='nickname'>{info.username}</View>
        </View>
        <View className='header'>{info.heading}</View>
        <View className='cnt'>{info.content}</View>
        <View className='time'>
          <Image className='timeimg' src='../../static/image/timeicon.png' ></Image>
          <View className='timetxt'>下单时间：{info.datatime}</View>
        </View>
        <View className='place'>
          <Image className='placeimg' src='../../static/image/placeicon.png'></Image>
          <View className='placetxt'>拼单地点：{info.location}</View>
        </View>
        <View className='num'>已拼{info.numExist}/{info.numNeed}</View>
        {info.picture?
        <View className='img-box'>
        <Image className='content-imge' src={info.picture} mode='aspectFit' onClick={this.previewImage.bind(this)}></Image>
        </View>
        :
        <View></View>
        }
        </View>
        <View className='remarknum'>{comments.length}条评论回复</View>
        <View className='comments'>
        <View className='talk'>
        <Image className='headsculpture' src={Taro.getStorageSync('userInfo').headPicture}/>
        <Input className='text' 
          type='text'
          placeholderClass='input_null'
          placeholder='问问更多细节吧~'
          cursorSpacing={0}
          value={remark}
          onInput={this.changeRemark.bind(this)}
        ></Input> 
        <View className='release'> 
        <View className='submit' onClick={this.submitForm.bind(this)}>发送</View> 
        </View>
      </View> 
      {comments.map((obj) => (
        <View className='return'>
        <View className='remark_box'>
        <Image src={obj.headpicture? obj.headpicture : ""} className='headsculpture'></Image>
      <Text className='head-name'>
      {obj.username}
      </Text>
      <Text style={{float:'right'}}>
      {obj.datetime}
      </Text>
      </View>
      <View className='remark'>
        {obj.content}
      </View>
    </View> 
    ))}
      </View>
      <View className='blank'>  </View>
      <Button className={showButtonEdit?'footer':'none'} onClick={this.toPostOrder.bind(this)}>我要拼单</Button>
      {/* <Button className={showButtonCheek?'footer_blue':'none'} onClick={this.toPostOrder}>编辑</Button> */}
    </View>
    )
  }
}
