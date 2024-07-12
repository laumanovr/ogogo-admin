<template>
  <div class="loader-container">
    <img src="@/shared/assets/loader.gif" class="loader" alt="" />
  </div>
</template>

<style lang="scss" scoped>
@import "../../../app//styles/colors.scss";
.loader-container {
  position: fixed;
  z-index: 999;
  background: rgba($white, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
