import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import { MessageRemindingService } from '../../../../message-reminding.service';

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
      (popoverVisibleChange)="loadData()"
    ></notice-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNotifyComponent implements OnInit {
  data: NoticeItem[] = [
    {
      title: '新的消息',
      list: [],
      emptyText: '没有新的消息',
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: '清空',
    },
    // {
    //   title: '消息',
    //   list: [],
    //   emptyText: '您已读完所有消息',
    //   emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
    //   clearText: '清空消息',
    // },
    // {
    //   title: '新的收付款',
    //   list: [],
    //   emptyText: '近期没有收付款提醒',
    //   emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
    //   clearText: '清空',
    // },
  ];

  count = 0;
  loading = false;
  messageList: any[];

  constructor(private msg: NzMessageService, private wsSrv: MessageRemindingService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.wsSrv.getChannel("reminding:contract");
    this.wsSrv.channel.on("new_msg", msg => {
      if (this.messageList) {
        this.messageList = this.messageList.concat(msg['messages']);
      } else this.messageList = msg['messages'];
      this.loadData();

    });
  }

  private updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime!, {
          locale: (window as any).__locale__,
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type)!.list.push(newItem);
    });
    return data;
  }

  loadData() {
    if (this.loading) return;
    this.loading = true;
    // setTimeout(() => {
    let msgs = this.getMessagesArray()
    this.count = msgs.length
    this.data = this.updateNoticeData(msgs)
    // this.data = this.updateNoticeData([
    //   {
    //     // id: '000000001',
    //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    //     title: '你收到了 14 份新周报',
    //     datetime: '2011-08-08 13:20:20',
    //     type: '新的合同',
    //   },
    //   {
    //     // id: '000000002',
    //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    //     title: '你推荐的 曲妮妮 已通过第三轮面试',
    //     datetime: '2017-08-08',
    //     type: '新的合同',
    //   },
    //   // {
    //   //   id: '000000003',
    //   //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    //   //   title: '这种模板可以区分多种通知类型',
    //   //   datetime: '2017-08-07',
    //   //   read: true,
    //   //   type: '通知',
    //   // },
    //   // {
    //   //   id: '000000004',
    //   //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    //   //   title: '左侧图标用于区分不同的类型',
    //   //   datetime: '2017-08-07',
    //   //   type: '通知',
    //   // },
    //   // {
    //   //   id: '000000005',
    //   //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    //   //   title: '内容不要超过两行字，超出时自动截断',
    //   //   datetime: '2017-08-07',
    //   //   type: '通知',
    //   // },
    //   // {
    //   //   id: '000000006',
    //   //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    //   //   title: '曲丽丽 评论了你',
    //   //   description: '描述信息描述信息描述信息',
    //   //   datetime: '2017-08-07',
    //   //   type: '消息',
    //   // },
    //   // {
    //   //   id: '000000007',
    //   //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    //   //   title: '朱偏右 回复了你',
    //   //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    //   //   datetime: '2017-08-07',
    //   //   type: '消息',
    //   // },
    //   // {
    //   //   id: '000000008',
    //   //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    //   //   title: '标题',
    //   //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    //   //   datetime: '2017-08-07',
    //   //   type: '消息',
    //   // },
    //   // {
    //   //   id: '000000009',
    //   //   title: '任务名称',
    //   //   description: '任务需要在 2017-01-12 20:00 前启动',
    //   //   extra: '未开始',
    //   //   status: 'todo',
    //   //   type: '待办',
    //   // },
    //   // {
    //   //   id: '000000010',
    //   //   title: '第三方紧急代码变更',
    //   //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    //   //   extra: '马上到期',
    //   //   status: 'urgent',
    //   //   type: '待办',
    //   // },
    //   // {
    //   //   id: '000000011',
    //   //   title: '信息安全考试',
    //   //   description: '指派竹尔于 2017-01-09 前完成更新并发布',
    //   //   extra: '已耗时 8 天',
    //   //   status: 'doing',
    //   //   type: '待办',
    //   // },
    //   // {
    //   //   id: '000000012',
    //   //   title: 'ABCD 版本发布',
    //   //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    //   //   extra: '进行中',
    //   //   status: 'processing',
    //   //   type: '待办',
    //   // },
    // ]);
    this.loading = false;
    this.cdr.detectChanges();
    // }, 1000);
  }

  getMessagesArray() {
<<<<<<< HEAD
    let length = this.messageList.length;
    let src = this.messageList;
    let des: any[] = [];
    for (var i in src) {
      let e = { id: src[i]['id'], title: src[i]['body'], datetime: src[i]['datetime'], type: '新的消息', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png' }
=======
    const length = this.messageList.length;
    const src = this.messageList;
    const des: any[] = [];
    for (const i in src) {
      const e = { id: src[i].id, title: src[i].body, datetime: src[i].datetime, type: '新的消息', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png' }
>>>>>>> 6f62feec5b1dc92a65a1f1d096b12fd5b0784edc
      des.push(e)
    }
    return des;
  }

  getMaxDatetime(list) {
<<<<<<< HEAD
    let length = list.length;
    let max = "0000-00-00 00:00:00"
    for (let i in list) {
      if (list[i]['datetime'] > max) {
        max = list[i]['datetime'];
=======
    const length = list.length;
    let max = "0000-00-00 00:00:00"
    for (const i in list) {
      if (list[i].datetime > max) {
        max = list[i].datetime;
>>>>>>> 6f62feec5b1dc92a65a1f1d096b12fd5b0784edc
      }
    }
    return max
  }

  clear(type: string) {
<<<<<<< HEAD
    //后台需要标记已读
    if ((this.messageList) && (this.messageList.length)) {
      let params = { last_datetime: this.getMaxDatetime(this.messageList), token: localStorage.getItem("currentToken") }
=======
    // 后台需要标记已读
    if ((this.messageList) && (this.messageList.length)) {
      const params = { last_datetime: this.getMaxDatetime(this.messageList), token: localStorage.getItem("currentToken") }
>>>>>>> 6f62feec5b1dc92a65a1f1d096b12fd5b0784edc
      this.wsSrv.channel.push("received", params)
    }
    const data = this.data.slice();
    data.forEach(i => (i.list = []));
    this.messageList = [];
    this.data = data;
    this.count = 0;
    this.msg.success(`清空了 ${type}`);
  }

  select(res: any) {
    this.msg.success(`点击了 ${res.title} 的 ${res.item.title}`);
  }
}