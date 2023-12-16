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
}

export const LunchCard: React.FC<LunchCardProps> = ({ name, price, isSoldOut }) => {
    return (
        <Card className="mt-6 max-w-96 w-full" placeholder={undefined}>
            <CardHeader color="blue-gray" className="relative h-56" children={undefined} placeholder={undefined}>
                {/* Your image here */}
                
            </CardHeader>
            <CardBody placeholder={undefined}>
                <Typography variant="h5" color="blue-gray" className="mb-2" placeholder={undefined}>
                    {name}
                </Typography>
                <Typography placeholder={undefined}>
                    Price: {price}円
                    <br />
                    {isSoldOut ? 'Sold Out' : 'Available'}
                </Typography>
            </CardBody>
            {/* TODO:ここはLoginしたら表示 */}
            <CardFooter className="pt-0" placeholder={undefined}>
                <Button placeholder={undefined}>Change Style</Button>
            </CardFooter>
        </Card>
    );
};
