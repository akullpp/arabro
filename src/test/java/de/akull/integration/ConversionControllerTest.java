package de.akull.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.akull.controller.conversion.ConversionController;
import de.akull.controller.conversion.ConversionRequest;
import de.akull.service.NumeralService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ConversionController.class)
public class ConversionControllerTest {

    private static final String ENDPOINT = "/api/v1/conversion";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private NumeralService numeralService;

    public void Should_Respond_With_An_Validation_Exception_For_Null() throws Exception {
        ConversionRequest invalidRequest = new ConversionRequest(null);

        ResultActions result = mockMvc.perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        expectValidationException(result, "may not be null");
    }

    @Test
    public void Should_Respond_With_An_Validation_Exception_For_Zero() throws Exception {
        ConversionRequest invalidRequest = new ConversionRequest(0);

        ResultActions result = mockMvc.perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        expectValidationException(result, "must be greater than or equal to 1");
    }

    @Test
    public void Should_Respond_With_An_Validation_Exception_For_A_Negative_Number() throws Exception {
        ConversionRequest invalidRequest = new ConversionRequest(-100);

        ResultActions result = mockMvc.perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        expectValidationException(result, "must be greater than or equal to 1");
    }

    @Test
    public void Should_Respond_With_An_Validation_Exception_For_A_Number_Greater_Than_3999() throws Exception {
        ConversionRequest invalidRequest = new ConversionRequest(4000);

        ResultActions result = mockMvc.perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        expectValidationException(result, "must be less than or equal to 3999");
    }

    @Test
    public void Should_Respond_With_A_Valid_Conversion_For_1() throws Exception {
        ConversionRequest invalidRequest = new ConversionRequest(1);

        ResultActions result = mockMvc.perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        expectSuccess(result, 1, "I");
    }

    @Test
    public void Should_Respond_With_A_Valid_Conversion_For_3999() throws Exception {
        ConversionRequest invalidRequest = new ConversionRequest(3999);

        ResultActions result = mockMvc.perform(post(ENDPOINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        expectSuccess(result, 3999, "MMMCMXCIX");
    }

    private void expectValidationException(ResultActions result, String message) throws Exception {
        result.andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.reason", is("ValidationException")))
                .andExpect(jsonPath("$.errors").exists())
                .andExpect(jsonPath("$.errors[0].field", is("number")))
                .andExpect(jsonPath("$.errors[0].message", is(message)));
    }

    private void expectSuccess(ResultActions result, int arabic, String roman) throws Exception {
        result.andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.arabic", is(arabic)))
                .andExpect(jsonPath("$.roman", is(roman)))
                .andExpect(jsonPath("$.isPrime").isBoolean())
                .andExpect(jsonPath("$._links.self.href").isString());
    }
}
