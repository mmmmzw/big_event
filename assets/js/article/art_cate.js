$(function () {
  const form = layui.form;
  getInitCate();
  function getInitCate() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        const html = template('tpl-table', res);

        $('tbody').html(html);
        console.log(html);
      },
    });
  }
  let indexAdd = null;
  $('#btnAdd').on('click', function () {
    // 弹出层
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '新增文章分类',
      content: $('#dialog-add').html(),
    });
  });

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg('添加失败');
          return;
        }

        layer.msg('添加成功');
        getInitCate();
        layer.close(indexAdd);
      },
    });
  });
  let indexEdit = null;
  $('tbody').on('click', '#btnEdit', function () {
    // 弹出层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑文章分类',
      content: $('#dialog-edit').html(),
    });

    const id = $(this).data('id');

    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        console.log(res);
        // 第一个参数为form表单对应的lay-filter的值
        form.val('form-edit', res.data);
      },
    });
  });

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg('更新失败');
          return;
        }

        layer.msg('更新成功');
        getInitCate();
        layer.close(indexEdit);
      },
    });
  });

  // 删除功能
  // url: '/my/article/deletecate/' + id,
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');

    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！');
          }
          layer.msg('删除分类成功！');
          // 关闭浮层
          layer.close(index);

          // 重新获取分类数据列表
          getInitCate();
        },
      });
    });
  });
});
