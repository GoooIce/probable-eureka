// Step 1: Define the OrgDto interface
interface OrgDto {
  name: string;
  superiorId?: number;
  orgTypeCode: string;
}

// Step 2: Define the OrgService class
class OrgService {
  private orgRepository: OrgRepository;

  constructor(orgRepository: OrgRepository) {
    this.orgRepository = orgRepository;
  }

  async addOrg(orgDto: OrgDto): Promise<OrgDto> {
    // Step 3: Validate the input
    if (!orgDto.name) {
      throw new Error('Org name is required');
    }

    // Step 4: Create the Org object
    const org = new Org(orgDto.name, orgDto.superiorId, orgDto.orgTypeCode);

    // Step 5: Save the Org object to the database
    const savedOrg = await this.orgRepository.save(org);

    // Step 6: Return the DTO
    return {
      name: savedOrg.name,
      superiorId: savedOrg.superiorId,
      orgTypeCode: savedOrg.orgTypeCode,
    };
  }
}

// Step 7: Define the OrgRepository interface
interface OrgRepository {
  save(org: Org): Promise<Org>;
}

// Step 8: Define the Org class
class Org {
  id?: number;
  name: string;
  superiorId?: number;
  orgTypeCode: string;

  constructor(name: string, orgTypeCode: string, superiorId?: number) {
    this.name = name;
    this.superiorId = superiorId;
    this.orgTypeCode = orgTypeCode;
  }
}

// Step 9: Define the OrgController class
class OrgController {
  private orgService: OrgService;

  constructor(orgService: OrgService) {
    this.orgService = orgService;
  }

  async addOrg(orgDto: OrgDto): Promise<OrgDto> {
    // Step 2: Call the OrgService to add the Org
    const savedOrgDto = await this.orgService.addOrg(orgDto);

    // Step 6: Return the DTO
    return savedOrgDto;
  }
}

// 