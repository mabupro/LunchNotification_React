import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

type LunchCardProps = {
    name: string;
    price: number;
    isSoldOut: boolean;
    downloadUrl: string;
    documentId: string;
    onUpdateSoldOut: (documentId: string, isSoldOut: boolean) => void;
    isLogin: boolean;
}

export const LunchCard: React.FC<LunchCardProps> = ({ name, price, isSoldOut, downloadUrl, documentId, onUpdateSoldOut, isLogin }) => {

    const handleUpdateSoldOut = () => {
        onUpdateSoldOut(documentId, !isSoldOut);
    };

    return (
        <Card className="mt-6 max-w-96 w-full" placeholder={undefined}>
            <CardHeader className="h-56" placeholder={undefined}>
            <img
                src={downloadUrl}
                alt={name}
                className={`w-full h-full object-cover hover:scale-110 transition-transform duration-300 ${isSoldOut ? 'filter grayscale' : ''}`}
            />
            </CardHeader>
            <CardBody placeholder={undefined}>
                <Typography variant="h5" color="blue-gray" className="mb-2" placeholder={undefined}>
                    {name}
                </Typography>
                <Typography placeholder={undefined}>
                    Price: {price}円
                    <br />
                    {isSoldOut ? <span className={`text-${isSoldOut ? 'red' : 'green'}-500`}>Sold Out</span> : <span className={`text-${isSoldOut ? 'red' : 'green'}-500`}>Available</span>}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0" placeholder={undefined}>
                {isLogin && (
                    <Button
                        onClick={handleUpdateSoldOut}
                        className={`bg-${isSoldOut ? 'green' : 'red'}-500`} placeholder={undefined}                    >
                        {isSoldOut ? 'Mark Available' : 'Mark Sold Out'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};
