import { RouterProvider, useLocation } from 'react-router-dom';
import { router } from './pages/routes';
import { useWebSocket } from './hooks/useWebSocket';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from './redux/hooks';
import { getImageUrl } from './utils/helpers';
import { Link } from 'react-router-dom';

function App() {
	const me = useAppSelector(state => state.profile.me)
	const receivedMessage = useAppSelector(state => state.websocket.receivedMessage)
	const socket = useWebSocket();

	useEffect(() => {
		const chatIdFromUrl = window.location.href.split('/').pop();
		if (receivedMessage && receivedMessage?.senderId !== me?._id && chatIdFromUrl !== receivedMessage?.chatId) {
			const { content, sender, chatId } = receivedMessage;

			const notificationContent = (
				<div className="bg-white border border-grey-30 rounded-lg shadow-lg p-4 max-w-sm w-full mx-auto">
					<div className="flex items-center mb-2">
						<img src={getImageUrl(sender?.avatar)} alt={sender?.username} className="w-8 h-8 rounded-full mr-2" />
						<div className="text-gray-800 font-bold">{sender?.username}</div>
					</div>
					<div className="text-gray-700">{content}</div>
					<div className='row-group justify-end'>
						<Link to={`/messages/${chatId}`} className="btn btn--sm btn--primary rounded">To Chat</Link>
					</div>
				</div>
			);

			toast(notificationContent, {
				closeButton: true,
				pauseOnHover: true,
				draggable: true,
				closeOnClick: true,
				bodyClassName: 'notification',
				autoClose: 5000,
			}) 
		}
	}, [receivedMessage])


	return (
		<RouterProvider router={router} />
	);
}

export default App;
