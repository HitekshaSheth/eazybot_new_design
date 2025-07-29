<script setup>
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import paypal from '@images/cards/paypal-rounded.png'

const notifications = ref([
  {
    type : 'alert',
    id: 1,
    img: avatar4,
    title: 'Congratulation Flora! 🎉',
    subtitle: 'Won the monthly best seller badge',
    time: 'Today',
    isSeen: true,
  },
  {
    type : 'alert',
    id: 2,
    text: 'Tom Holland',
    title: 'New user registered.',
    subtitle: '5 hours ago',
    time: 'Yesterday',
    isSeen: false,
  },
  {
    type : 'alert',
    id: 3,
    img: avatar5,
    title: 'New message received 👋🏻',
    subtitle: 'You have 10 unread messages',
    time: '11 Aug',
    isSeen: true,
  },
  {
    type : 'alert',
    id: 4,
    img: paypal,
    title: 'PayPal',
    subtitle: 'Received Payment',
    time: '25 May',
    isSeen: false,
    color: 'error',
  },
  {
    type : 'alert',
    id: 5,
    img: avatar3,
    title: 'Received Order 📦',
    subtitle: 'New order received from john',
    time: '19 Mar',
    isSeen: true,
  },
  {
    type : 'alert',
    id: 6,
    img: avatar4,
    title: 'Congratulation Flora! 🎉',
    subtitle: 'Won the monthly best seller badge',
    time: 'Today',
    isSeen: true,
  },
  {
    type : 'alert',
    id: 7,
    text: 'Tom Holland',
    title: 'New user registered.',
    subtitle: '5 hours ago',
    time: 'Yesterday',
    isSeen: false,
  },
  {
    type : 'alert',
    id: 8,
    img: avatar5,
    title: 'New message received 👋🏻',
    subtitle: 'You have 10 unread messages',
    time: '11 Aug',
    isSeen: true,
  },
  {
    type : 'alert',
    id: 9,
    img: paypal,
    title: 'PayPal',
    subtitle: 'Received Payment',
    time: '25 May',
    isSeen: false,
    color: 'error',
  },
  {
    type : 'alert',
    id: 10,
    img: avatar3,
    title: 'Received Order 📦',
    subtitle: 'New order received from john',
    time: '19 Mar',
    isSeen: true,
  },
  {
    type : 'update',
    id: 11,
    img: avatar4,
    title: 'Congratulation Flora! 🎉',
    subtitle: 'Won the monthly best seller badge',
    time: 'Today',
    isSeen: true,
  },
  {
    type : 'update',
    id: 12,
    text: 'Tom Holland',
    title: 'New user registered.',
    subtitle: '5 hours ago',
    time: 'Yesterday',
    isSeen: false,
  },
  {
    type : 'log',
    id: 13,
    img: avatar5,
    title: 'New message received 👋🏻',
    subtitle: 'You have 10 unread messages',
    time: '11 Aug',
    isSeen: true,
  },
  {
    type : 'update',
    id: 14,
    img: paypal,
    title: 'PayPal',
    subtitle: 'Received Payment',
    time: '25 May',
    isSeen: false,
    color: 'error',
  },
  {
    type : 'update',
    id: 15,
    img: avatar3,
    title: 'Received Order 📦',
    subtitle: 'New order received from john',
    time: '19 Mar',
    isSeen: true,
  },
  {
    type : 'log',
    id: 16,
    img: avatar4,
    title: 'Congratulation Flora! 🎉',
    subtitle: 'Won the monthly best seller badge',
    time: 'Today',
    isSeen: true,
  },
  {
    type : 'update',
    id: 17,
    text: 'Tom Holland',
    title: 'New user registered.',
    subtitle: '5 hours ago',
    time: 'Yesterday',
    isSeen: false,
  },
  {
    type : 'update',
    id: 18,
    img: avatar5,
    title: 'New message received 👋🏻',
    subtitle: 'You have 10 unread messages',
    time: '11 Aug',
    isSeen: true,
  },
  {
    type : 'update',
    id: 19,
    img: paypal,
    title: 'PayPal',
    subtitle: 'Received Payment',
    time: '25 May',
    isSeen: false,
    color: 'error',
  },
  {
    type : 'log',
    id: 20,
    img: avatar3,
    title: 'Received Order 📦',
    subtitle: 'New order received from john',
    time: '19 Mar',
    isSeen: true,
  },
])

const removeNotification = notificationId => {
  notifications.value.forEach((item, index) => {
    if (notificationId === item.id)
      notifications.value.splice(index, 1)
  })
}

const markRead = notificationId => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = true
    })
  })
}

const markUnRead = notificationId => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = false
    })
  })
}

const handleNotificationClick = notification => {
  if (!notification.isSeen)
    markRead([notification.id])
}
</script>

<template>
  <TabNotifications
    :notifications="notifications"
    @remove="removeNotification"
    @read="markRead"
    @unread="markUnRead"
    @click:notification="handleNotificationClick"
  />
</template>
