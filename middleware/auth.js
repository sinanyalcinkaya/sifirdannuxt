export default function({ store, error }) {
  console.log(store);
  console.log("MERHABA");
  if (!store.state.authUser) {
    error({
      message: "You are not connecteaad",
      statusCode: 403
    });
  }
}
