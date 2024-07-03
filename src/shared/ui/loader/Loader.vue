<template>
  <div class="loader-container">
    <div class="loader"></div>
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
  .loader {
    border: 3px solid $gray-50;
    border-radius: 50%;
    border-top-color: $violet-500;
    width: 50px;
    height: 50px;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
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
