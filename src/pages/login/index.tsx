import { Component } from 'react'
import { View, Text,Image,Input,Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro';
import logo from "../../static/image/logo.png";
import { loginUser } from '../../common/request/userInfo';
import { AtInput } from 'taro-ui';

interface IndexProps{
}
interface IndexState{
  username:string,
  password:string
}
export default class Index extends Component<IndexProps,IndexState> {
  constructor(props:IndexProps){
    super(props);
    this.state={
      username: '',
      password: ''
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
changeusername(value) {
  this.setState({
    username: value
  });
  return value;
}

changepassword(value) {
  this.setState({
    password: value
  });
  return value;
}
register(){
  Taro.navigateTo({
      url:'/pages/register/index'
  })
}
Login = async() => {
  const{username,password} = this.state;
  const res = await loginUser({account:username,password:password});
  console.log(res);
  if(res.code === 200){
    Taro.setStorageSync('userInfo',res.data);
    Taro.navigateBack();
  }else{
    Taro.showToast({
      title: "账号或密码错误",
      icon: "none",
      duration: 1000
    })
  }
}
  render () {
    const {  username, password } = this.state;
    return (
      <View className='login'>
      <View className='logo_container'>
        <Image className='logo' src={logo} />
      </View>
      <View className='form_container'>
        <View className='login_item login_name'>
          <AtInput
            placeholderClass='placeholder'
            name="账号"
            type='number'
            title='账号'
            placeholder='请输入账号'
            value={username}
            onChange={this.changeusername.bind(this)}
          />
        </View>
        <View className='login_item login_code'>
          <AtInput
            placeholderClass='placeholder'
            name="密码"
            type='text'
            title='密码'
            password
            placeholder='请输入密码'
            value={password}
            onChange={this.changepassword.bind(this)}
          />
        </View>
      </View>
      <View className='btn_container'>
        <Button className='login_btn' onClick={this.Login.bind(this)} >
          登录
        </Button>
      </View>
      <View className='register-box'>
          <Text className='register' onClick={this.register.bind(this)}>没有账户？点击注册</Text>
      </View>
    </View>
    )
  }
}
