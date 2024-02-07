export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode:string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface vendorLoginInputs {
    email: string;
    password: string;
}

export interface vendorPayload{
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
}

export interface editVendorInputs {
    name: string,
    address: string,
    phone: string,
    foodTypes: [string]
}