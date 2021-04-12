$(function () {
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '', // 文章的发布状态
  };

  const form = layui.form;
  const laypage = layui.laypage;

  function padZero(n) {
    return String(n).padStart(2, '0');
  }

  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);

    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());

    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
  };

  /**
    账号: zt6667
    密码：12345678
 */
  initList();
  function initList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          layer.msg('获取列表失败');
          return;
        }

        const htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
        renderPage(res.total);
      },
    });
  }

  initCate();

  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！');
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      },
    });
  }

  $('#form-search').on('submit', function (e) {
    e.preventDefault();
    // 获取表单中选中项的值
    var cate_id = $('[name=cate_id]').val(); // 获取分类下拉框的值
    var state = $('[name=state]').val(); // 获取状态选择的值
    // 为查询参数对象 q 中对应的属性赋值
    // 修改全局的参数对象，来重新获取新数据
    q.cate_id = cate_id;
    q.state = state;
    // 根据最新的筛选条件，重新渲染表格的数据
    initList();
  });

  // 渲染分页方法
  function renderPage(total) {
    console.log(total);
    laypage.render({
      elem: 'page', // 分页区域的id
      count: total, //总条数
      limit: q.pagesize, // 每页的条数
      curr: q.pagenum, // 当前页
      theme: '#FF5722',
      prev: '🐶🐷',
      next: '🐱🐤',
      layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        // 点击页码跳转的时候 undefined
        q.pagenum = obj.curr;

        // 每页展示条数
        q.pagesize = obj.limit;
        // 如果是通过render方法触发的，则会被忽略掉
        if (!first) {
          initList();
        }
      },
    });
  }

  $('tbody').on('click', '.btn-delete', function () {
    // 获取当前点击的文章的 id，需要发送到服务端做删除操作
    var id = $(this).attr('data-id');
    var len = $('.btn-delete').length;
    // 询问用户是否要删除数据
    // layer.confirm弹出确认框，确认框里面执行发起请求删除的操作
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败！');
          }
          layer.msg('删除文章成功！');
          if (len === 1 && q.pagenum !== 1) {
            // 说明没数据了
            // q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
            q.pagenum--;
          }
          initList();
        },
      });

      layer.close(index);
    });
  });
});

const resData = [1]; // 1200条数据

// 分页 每页展示多少条：数据做划分 4
// 展示第几页的数据 2
