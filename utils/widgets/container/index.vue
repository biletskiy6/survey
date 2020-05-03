<template>
    <div
            class="lz-container"
            :data-uuid="dataUuid"
            :class="[playState ? 'anm-' + val.animationName : '']"
            :style="{
      display: val.display,
      position: 'absolute',
      width: val.width + 'px',
      height: val.height + 'px',
      left: val.left + 'px',
      top: val.top + 'px',
      color: val.color,
      zIndex: 1,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }">

        <div class="table" >
            <div class="hd">
                <div class="hd-1">
                    <slot name="0"/>
                </div>
                <div class="hd-2">
                    <slot name="1"/>
                </div>
            </div>
            <div class="ft">
                <slot name="2"/>
            </div>
        </div>

        <button class="edit-tmp" @click="onEditClick(dataUuid)" :data-type="dataType" :data-uuid="dataUuid"><img :data-type="dataType" :data-uuid="dataUuid" src="https://img.icons8.com/wired/64/000000/pencil.png"></button>
    </div>
</template>

<style>
    .edit-tmp {
        position: absolute;
        border: none;
        width: 20%;
        right: 0;
        bottom: 10px;
        z-index: 999999;
        background-color: #fff;
    }
    .edit-tmp:hover {
        background-color: #fff;
    }
    .edit-tmp img {
        width: 30px;
        height: 30px;
    }
</style>

<script>

    const WIDGET_NAME = 'braid-container'
    export default {
        name: WIDGET_NAME,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
        title: 'Container',
        setting: {
            type: WIDGET_NAME,
            isContainer: true,
            hasGuide: true,
            isUpload: false,
            isChild: false,
            dragable: true,
            resizable: true,
            name: '',
            width: 650,
            height: 300,
            left: 50,
            top: 0,
            z: 1,
            display: 'flex',
            color: '',
            bgColor: '',
            backPic: '',
            backPicUrl: '',
            radius: 0,
            borderColor: '',
            borderWidth: 0,
            dir: 'row',
            justify: 'space-between',
            align: 'flex-start',
            belong: 'page',
            animationName: ''
        },
        props: ['val', 'h', 'playState', 'dataType',
            'dataUuid'],
    }
</script>

<style scoped type="scss">
    .lz-container {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }

    .hd {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .hd-1 {

    }
    .hd-2 {

    }

    table {
        width: 100%;
    }

    .tg th.hd {
        width: 80%;
    }

    .tg {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .tg td {
        font-family: Arial, sans-serif;
        font-size: 14px;
        padding: 0;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        word-break: normal;
        border-color: black;
    }

    .tg th {
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        padding: 0;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        word-break: normal;
        border-color: black;
    }

    .tg .tg-0pky {
        border-color: inherit;
        text-align: left;
        vertical-align: middle
    }
</style>
