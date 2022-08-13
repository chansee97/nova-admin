import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta extends AppRoute.RouteMeta {}
}
interface Window {
  $loadingBar?: import('naive-ui').LoadingBarApiInjection;
  $dialog?: import('naive-ui').DialogApiInjection;
  $message?: import('naive-ui').MessageApiInjection;
  $notification?: import('naive-ui').NotificationApiInjection;
}
