import Image from 'next/image';
import Spin from '../../../public/spin_loading.svg'


const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32">
                <Image src={Spin} width={80}/>
            </div>
        </div>
    );
}
export default Loading;