$(function () {
  // 点击了登录界面的注册按钮
  $('#link_reg').on('click', function () {
    // login隐藏
    $('.login-box').hide();
    // reg展示
    $('.reg-box').show();
  });
  // 点击了注册界面的登录按钮
  $('#link_login').on('click', function () {
    // login隐藏
    $('.login-box').show();
    // reg展示
    $('.reg-box').hide();
  });

  // 自定义校验规则
  // const form = layui.form;
  // const layer = layui.layer;

  const { form, layer } = layui;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '客官，密码要符合规则哟~'],
    repwd: function (value) {
      // value ==> 确认密码框的值
      // pwd ==> 密码框的值
      const pwd = $('.reg-box [name=password]').val();
      if (value !== pwd) {
        return '两次密码不一致';
      }
    },
  });

  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
          return;
        }
        layer.msg('注册成功');
        $('#link_login').click();
      },
    });
  });

  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg('登录失败');
          return;
        }

        localStorage.setItem('token', res.token);
        location.href = '/index.html';
        // success
        // token;
      },
    });
  });
});
