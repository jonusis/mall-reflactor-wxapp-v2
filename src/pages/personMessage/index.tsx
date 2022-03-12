import { Component } from 'react'
import { View, Text, Button,Image,Input, Picker } from '@tarojs/components'
import './index.scss'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getUserInfo, updateUserInfo } from '../../common/request/userInfo'
import { UserBto, UserDto } from '../../common/resultType/user'
import { AtForm, AtInput, AtList, AtListItem } from 'taro-ui'

interface IndexProps{
}
interface IndexState{
  userInfo: UserBto,
  isEditAll: boolean,
  name: string,
  sex: string,
  age: string,
  tel: string,
  qq: string,
  wechat: string,
  selector: string[]
}

export default class Index extends Component<IndexProps,IndexState> {
  constructor(props:IndexProps){
    super(props)
    this.state = {
      userInfo: {} as UserBto,
      isEditAll: false,
      wechat: '',
      qq: '',
      tel: '',
      name: '',
      sex: '',
      age: '',
      selector: ['男', '女'],
      }
    }
  componentWillMount () { }

  async componentDidMount () {
    const uid = Taro.getStorageSync('userInfo').uid;
    const res = await getUserInfo(uid);
    this.setState({
      userInfo: res.data,
      name: res.data.name,
      age: res.data.age,
      sex: res.data.sex === 0 ? '女' : '男',
      tel: res.data.tel,
      qq: res.data.qq,
      wechat: res.data.wechat,
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  refresh = async() => {
    const {userInfo} = this.state;
    const res = await getUserInfo(userInfo.uid);
      this.setState({
        userInfo: res.data,
        name: res.data.name,
        age: res.data.age,
        sex: res.data.sex === 0 ? '女' : '男',
        tel: res.data.tel,
        qq: res.data.qq,
        wechat: res.data.wechat
    })
  }
  async onPullDownRefresh(){
    Taro.showNavigationBarLoading();
    this.refresh();
    Taro.hideNavigationBarLoading();
    Taro.stopPullDownRefresh();
}
  async torefInfo(){
    const {userInfo,name,sex,age,tel,qq,wechat} = this.state;
    const res = await updateUserInfo({
      uid: userInfo.uid,
      name: name,
      sex:sex === '女' ? 0 : 1,
      age:age,
      tel:tel,
      qq:qq,
      wechat:wechat,
      account:userInfo.account,
      headPicture:userInfo.headPicture,
    });
    this.refresh();
    this.setState({
      isEditAll: false
    })
  }
  changedisplay(){
    this.setState({
      isEditAll: true
    })
  }
  handleChangeName (value) {
    this.setState({
      name:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  handleChangeAge(value) {
    this.setState({
      age:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  handleChangeTel(value) {
    this.setState({
      tel:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  handleChangeQQ(value) {
    this.setState({
      qq:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  handleChangeWechat(value) {
    this.setState({
      wechat:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  render () {
    const {isEditAll,wechat,qq,tel,name,sex,age,selector} = this.state;
    return (
        <View>
          <View>
          {isEditAll ?  <View className="editButton" onClick={this.torefInfo.bind(this)}>保存</View> : <View className="editButton" onClick={this.changedisplay.bind(this)}>编辑</View>}   
          </View>     
        <AtForm>
          <AtInput
            name='name'
            disabled={!isEditAll}
            title='昵称'
            type='text'
            placeholder='请输入你的昵称'
            value={name}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            disabled={!isEditAll}
            name='age'
            title='年龄'
            type='number'
            placeholder='请输入你的年龄'
            value={age}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            disabled={!isEditAll}
            name='tel'
            title='手机号'
            type='number'
            placeholder='请输入手机号'
            value={tel}
            onChange={this.handleChangeTel.bind(this)}
          />
          <AtInput
            disabled={!isEditAll}
            name='qq'
            title='qq号'
            type='number'
            placeholder='请输入qq号'
            value={qq}
            onChange={this.handleChangeQQ.bind(this)}
          />
          <AtInput
            disabled={!isEditAll}
            name='wechat'
            title='微信号'
            type='text'
            placeholder='请输入微信号'
            value={wechat}
            onChange={this.handleChangeWechat.bind(this)}
          />
        </AtForm>
        {/* <View className='qqinput'>
          <Image className='photwo' src={photwo}></Image>
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='请输入手机号'
            value={tel}
            onInput={this.changetel.bind(this)}
          >{this.state.tel}</Input>
          </View>
          
          <View className='qqinput'>
          <Image className='photwo' src={photwo}></Image>
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='请输入手机号'
            value={tel}
            onInput={this.changetel.bind(this)}
          >{this.state.tel}</Input>
          </View>
          <View className='qqinput'>
          <Image className='pho' src={phoone}></Image>
          
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='快来完善微信号'
            value={wechat}
            onInput={this.changewechat.bind(this)}
          />
          </View>
          <View className='qqinput'>
          <Image className='pho' src={pho}></Image>
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='请输入qq号'
            value={qq}
            onInput={this.changeqq.bind(this)}
          />
          </View> */}
      </View>
    )
  }
}
