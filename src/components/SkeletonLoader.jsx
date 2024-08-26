import { Skeleton } from 'primereact/skeleton';
import { Card } from 'primereact/card';

function SkeletonLoader() {
    return (
        <div className="grid flex-wrap">
            <div className="col-12 sm:col-6 md:col-3 ">
                <Card className="h-100 noteCard">
                    <div className="card-title">
                        <Skeleton height="2rem" className="mt-0 mb-2"></Skeleton>
                        <box-icon name='dots-vertical-rounded' ></box-icon>
                    </div>
                    <p className="m-0">
                        <Skeleton className="mb-2"></Skeleton>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                    </p>
                </Card>
            </div>
            <div className="col-12 sm:col-6 md:col-3 ">
                <Card className="h-100 noteCard">
                    <div className="card-title">
                        <Skeleton height="2rem" className="mt-0 mb-2"></Skeleton>
                        <box-icon name='dots-vertical-rounded' ></box-icon>
                    </div>
                    <p className="m-0">
                        <Skeleton className="mb-2"></Skeleton>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                    </p>
                </Card>
            </div>
            <div className="col-12 sm:col-6 md:col-3 ">
                <Card className="h-100 noteCard">
                    <div className="card-title">
                        <Skeleton height="2rem" className="mt-0 mb-2"></Skeleton>
                        <box-icon name='dots-vertical-rounded' ></box-icon>
                    </div>
                    <p className="m-0">
                        <Skeleton className="mb-2"></Skeleton>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                    </p>
                </Card>
            </div>
            <div className="col-12 sm:col-6 md:col-3 ">
                <Card className="h-100 noteCard">
                    <div className="card-title">
                        <Skeleton height="2rem" className="mt-0 mb-2"></Skeleton>
                        <box-icon name='dots-vertical-rounded' ></box-icon>
                    </div>
                    <p className="m-0">
                        <Skeleton className="mb-2"></Skeleton>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                    </p>
                </Card>
            </div>
            <div className="col-12   sm:col-6 md:col-3 ">
                <Card className="h-100 noteCard">
                    <div className="card-title">
                        <Skeleton height="2rem" className="mt-0 mb-2"></Skeleton>
                        <box-icon name='dots-vertical-rounded' ></box-icon>
                    </div>
                    <p className="m-0">
                        <Skeleton className="mb-2"></Skeleton>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                    </p>
                </Card>
            </div>
        </div>)
}

export default SkeletonLoader