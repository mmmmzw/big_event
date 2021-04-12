$(function () {
  getUserInfo();
  console.log(layer);
  // debugger;

  $('#log_out').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (
      index
    ) {
      //do something

      // 移出本地存储
      localStorage.removeItem('token');
      location.href = '/login.html';

      // 关闭确认框
      layer.close(index);
    });
  });
});

function getUserInfo() {
  // 发请求，获取用户信息
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        layui.layer.msg('获取用户信息失败');
        return;
      }
      // 渲染头像
      renderAvatar(res.data);
    },
    // 请求失败时候执行的回调
    error: function () {},
  });
}

function renderAvatar(data) {
  console.log(data);
  const name = data.nickname || data.username;
  $('#welcome').html(`欢迎 ${name}`);

  if (data.user_pic) {
    // 渲染头像
    $('.layui-nav-img').attr('src', data.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文字头像
    const firstName = name[0].toUpperCase();
    $('.text-avatar').html(firstName).show();
    $('.layui-nav-img').hide();
  }
}
