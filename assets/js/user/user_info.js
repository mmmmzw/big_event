$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: function (value) {
      // value为待校验的值
      if (value.length > 6) {
        return '昵称太长了';
      }
    },
  });

  // 获取用户信息
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg('获取用户信息失败');
          return;
        }
        // form.val方法为表单快速赋值
        // 数据的key要跟表单的name值对应上
        // 第一个参数为表单对应的lay-filter的值
        form.val('userInfoForm', res.data);
      },
    });
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    getUserInfo();
  });

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg('更新用户信息失败');
          return;
        }
        layer.msg('更新用户信息成功');

        // 调用父页面getUserInfo方法
        window.parent.getUserInfo();
      },
    });
  });

  // const arr = [
  //   name: '加点',
  //   goods: [
  //     {
  //       name: '洗衣机',
  //       id: 111,
  //     }
  //   ]
  // ];
});
/**
  深拷贝  浅拷贝
  数据循环嵌套获取数据
  继承
  es6 let const  () => {}
  闭包
  // ------
  防抖节流
  // ------
  this指向问题


  http缓存


  dom diff (vue react算法区别)
  vue模板编译原理
  生命周期(父子组件嵌套时候的声明周期)
 */
