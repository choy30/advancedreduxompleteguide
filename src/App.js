import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showChart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data",
				})
			);
			const response = await fetch(
				"https://react-http-a1d35-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success",
					message: "Successfully sent cart data",
				})
			);
		};

    if (isInitial) {
      isInitial = false;
      return;
    }

		sendCartData().catch((error) => {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Failed to send cart data",
				})
			);
		});
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showChart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
