class InvalidCPFException(Exception):
    """Exception raised for invalid CPF numbers."""
    def __init__(self, cpf, message="Invalid CPF number"):
        self.cpf = cpf
        self.message = message
        super().__init__(self.message)


def cpf_validator(cpf: str) -> bool:
    cpf = ''.join(filter(str.isdigit, cpf))
    
    if len(cpf) != 11:
        raise InvalidCPFException(cpf, "CPF must have 11 digits")
    
    if cpf == cpf[0] * 11:
        raise InvalidCPFException(cpf, "CPF cannot be composed of the same digit")
    
    sum = 0
    for i in range(9):
        sum += int(cpf[i]) * (10 - i)
    
    first_verification_digit = (sum * 10 % 11) % 10
    
    if int(cpf[9]) != first_verification_digit:
        raise InvalidCPFException(cpf, "First verification digit is incorrect")

    sum = 0
    for i in range(10):
        sum += int(cpf[i]) * (11 - i)
    
    second_verification_digit = (sum * 10 % 11) % 10
    
    if int(cpf[10]) != second_verification_digit:
        raise InvalidCPFException(cpf, "Second verification digit is incorrect")
    

    return True
