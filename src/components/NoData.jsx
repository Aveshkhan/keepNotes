import errorSvg from '../assets/No data-amico.svg'

const NoData = () => {
    return (
        <div className='DisplayImg' >
            <img src={errorSvg} alt="Error" />
        </div>
    )
}

export default NoData