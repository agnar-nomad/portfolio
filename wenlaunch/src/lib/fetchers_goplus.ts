

const options = {
  method: 'GET',
  headers: {
    accept: '*/*'
  }
};

export async function fetchGoPlusTokenData(address: string, chainId: string) {

  try {
    const res = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${address}`, options)
    if (res.ok) {
      const data = await res.json()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export async function fetchGoPlusApprovalData(address: string, chainId: string) {

  try {
    const res = await fetch(`https://api.gopluslabs.io/api/v1/approval_security/${chainId}?contract_addresses=${address}`, options)
    if (res.ok) {
      const data = await res.json()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export async function fetchGoPlusMaliciousAddressData(address: string, chainId?: string) {

  try {
    const res = await fetch(`https://api.gopluslabs.io/api/v1/address_security/${address}${chainId ? '?chain_id='+chainId : ''}`, options)
    if (res.ok) {
      const data = await res.json()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export async function fetchGoPlusNftData(address: string, chainId: string) {

  try {
    const res = await fetch(`https://api.gopluslabs.io/api/v1/nft_security/${chainId}?contract_addresses=${address}`, options)
    if (res.ok) {
      const data = await res.json()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export async function fetchGoPlusDAPPData(website_url: string) {

  try {
    const res = await fetch(`https://api.gopluslabs.io/api/v1/dapp_security?url=${website_url}`, options)
    if (res.ok) {
      const data = await res.json()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}