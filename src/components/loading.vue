<template>
  <div class="contain">
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66">
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
</template>
<style scoped>
.contain {
  --offset: 187;
  --duration: 1.4s;
  --duration4: 5.6s;
  --offset4: 46.75;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: var(--background-color-light);
  padding-bottom: 10px;

}
.spinner {
  animation: rotator var(--duration) linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: var(--offset);
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash var(--duration) ease-in-out infinite,
    colors var(--duration4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: var(--offset);
  }
  50% {
    stroke-dashoffset: var(--offset4);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: var(--offset);
    transform: rotate(450deg);
  }
}
</style>