$(function () {
  initCate();
  initEditor();
  const { form } = layui;
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('初始化文章分类失败！');
        }
        // 调用模板引擎，渲染分类的下拉菜单
        var htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // 一定要记得调用 form.render() 方法
        form.render();
      },
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image');

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 点击选择图片按钮触发文件选择框的点击事件
  $('.btnChooseImage').on('click', function () {
    $('#coverFile').click();
  });

  // 选择文件的input框
  $('#coverFile').on('change', function (e) {
    console.dir(e.target.files); // 选择的文件列表

    const files = e.target.files;

    if (files.length <= 0) {
      // 没有选择文件
      return;
    }

    const file = files[0];

    const newImageUrl = URL.createObjectURL(file);
    // 使用插件把图片渲染在预览区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImageUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let art_state = '已发布';

  $('#save2').on('click', function () {
    art_state = '草稿';
  });

  // 监听表单提交事件
  $('#formPub').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault();

    // this就是当前提交的form表单
    // 通过formData模拟表单提交，参数为form的dom元素
    const fd = new FormData(this);
    fd.append('state', art_state);

    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob);
        // 6. 发起 ajax 数据请求

        publishArticle(fd);
      });
  });

  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg('发布失败');
          return;
        }
        layer.msg('发布失败');

        location.href = '/article/art_list.html';
      },
    });
  }
});
