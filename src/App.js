import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
	const showChart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		fetch("https://react-http-a1d35-default-rtdb.firebaseio.com/cart.json", {
			method: "PUT",
			body: JSON.stringify(cart),
		});
	}, [cart]);

	return (
		<Layout>
			{showChart && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
