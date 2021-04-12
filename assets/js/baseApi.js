$.ajaxPrefilter(function (options) {
  // 公共配置项
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

  options.complete = function (res) {
    const {
      responseJSON: { message, status },
    } = res;
    if (status === 1 && message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  };

  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
  }
});
