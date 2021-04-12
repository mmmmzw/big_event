$(function () {
  const form = layui.form;

  // 制定校验规则
  form.verify({
    // 密码框罗技
    pwd: [/^[\S]{6,12}$/, '密码不符合 规则'],
    // 新密码框逻辑
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同';
      }
    },

    // 确认密码框逻辑
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次输入密码不一致';
      }
    },
  });

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      data: $(this).serialize(),
      url: '/my/updatepwd',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg('修改密码失败');
          return;
        }
        layer.msg('修改密码成功');
        $('.layui-form')[0].reset();
      },
    });
  });
});
